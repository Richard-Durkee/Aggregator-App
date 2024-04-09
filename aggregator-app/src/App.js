import './App.css';
import { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormControlLabel } from '@mui/material';
import articleData from "./assets/article-data.json";
import ArticleCard from "./components/ArticleCard";
import ReadListItem  from './components/ReadListItem';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';

function App() {

  const [readListState, setReadList] = useState([]);
  const updateReadList = (item, req, index) => { 
      if (req === "add") {
        if (readListState.every((article) => {return !(article == item)})) {
          setReadList([... readListState, item])
        }
      } else if (req === "remove") {
        const newReadList = readListState.filter((_, i) => i !== index);
        setReadList(newReadList);
      }
    };

  const [filterState, setFilter] = useState({
    "lifestyle": false,
    "software-engineering": false,
    "business": false,
    "politics": false,
    "science": false,
    "music": false,
    "arts": false,
    "culture": false,
  });
  const handleFilter = (event) => {
    setFilter({
      ... filterState, [event.target.name]: event.target.checked,
    })
  }

  const sortFunctions = {
    "newest": (a, b) => { 
      return new Date(b.date) - new Date(a.date) 
    },
    "oldest":  (a, b) => { 
      return new Date(a.date) - new Date(b.date)
    },
    "shortest": (a, b) => { 
      return a["word-count"] - b["word-count"]
    },
    "longest":(a, b) => { 
      return b["word-count"] - a["word-count"]
    },
  }
  const [sortState, setSort] = useState();
  const handleSort = (event) => {
    setSort(
      event.target.value
    )
  }

  const handleReset = () => {
    const resetFilters = Object.fromEntries(
      Object.keys(filterState).map(key => [key, false])
    );
    setFilter(resetFilters);
    setReadList([]);
  }

  const filteredData = 
    Object.values(filterState).every((checked) => {return !checked})? // If no filters are applied, show everything
    articleData : articleData.filter((article) => filterState[article.genre]);

  // const sortedData = sortState ? filteredData.splice().sort(sortState) : filteredData;
  const sortedData = sortState ?
    filteredData.slice().sort(sortFunctions[sortState]) : filteredData;

  const renderedArticles = 
    sortedData.map((article) => (
      <ArticleCard
        title={article.title}
        subtitle={article.subtitle}
        image={article.image}
        date={article.date}
        author={article.author}
        link={article.link}
        wordCount={article["word-count"]}
        add={() => updateReadList(article, "add")}
      />
    ));

  return (
    <div className="App">
      
      <Box class="BrowseSection">
        <h1> Articles </h1>
        <div class="FilterAndSortBox"> 
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <FormControl>
              <FormLabel> Genre </FormLabel>
              <FormGroup>
                <FormControlLabel label="Lifestyle" control={<Checkbox onChange={handleFilter}  checked={filterState["lifestyle"]} name="lifestyle"/>} />
                <FormControlLabel label="Software Engineering" control={<Checkbox onChange={handleFilter} checked={filterState["software-engineering"]} name="software-engineering"/>} />
                <FormControlLabel label="Business" control={<Checkbox onChange={handleFilter}  checked={filterState["business"]} name="business"/>}  />
                <FormControlLabel label="Science" control={<Checkbox onChange={handleFilter}  checked={filterState["science"]} name="science"/>}  />
                <FormControlLabel label="Music" control={<Checkbox onChange={handleFilter}  checked={filterState["music"]} name="music"/>}  />
                <FormControlLabel label="Arts" control={<Checkbox onChange={handleFilter}  checked={filterState["arts"]} name="arts"/>}  />
                <FormControlLabel label="Culture" control={<Checkbox onChange={handleFilter}  checked={filterState["culture"]} name="culture"/>}  />
              </FormGroup>
              <FormLabel> Sort </FormLabel>
              <FormGroup>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortState}
                  label="sort"
                  onChange={handleSort}
                >
                  <MenuItem value={"newest"}> Newest </MenuItem>
                  <MenuItem value={"oldest"}> Oldest </MenuItem>
                  <MenuItem value={"shortest"}> Shortest </MenuItem>
                  <MenuItem value={"longest"}> Longest </MenuItem>
                </Select>
              </FormGroup>
              <FormGroup>
                <FormControlLabel class="ResetButton" label="Reset" control={<Button onClick={handleReset} />} />
              </FormGroup>
            </FormControl>
            
          </Box>
        </div>

        <Box class="Articles">
          {renderedArticles}
        </Box>

      </Box>

      <Divider orientation="vertical" variant="middle" flexItem />
        

      <Box class="ReadingList">
          <h2> Reading List </h2>
          <h3> Number of Articles: { readListState.length } </h3>
          {readListState.map((item, index) => (
            <ReadListItem 
              title={item.title} 
              subtitle={item.subtitle}
              link={item.link}
              remove={() => updateReadList(item, "remove", index)}
            />
          ))}
      </Box>
      
    </div>
  );
}

export default App;
