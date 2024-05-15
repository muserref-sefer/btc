import { useContext, useState } from "react";
import { NewsContextType } from "../../@types/types";
import { NewsContext } from "../../store/Context";
import "./Filter.scss";

function Filter() {
  const { filterNewsSourcesByCategory, newsSources } = useContext(NewsContext) as NewsContextType;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const allCategories: string[] = [];
  newsSources.forEach(newsSource => {
    allCategories.push(newsSource.category);
  });
  const categories: string[] = Array.from(new Set(allCategories));

  const toggleCategory = (categoryName: string) => {
    const index = selectedCategories.indexOf(categoryName);
    const categories = [...selectedCategories];

    if (index !== -1) {
      categories.splice(index, 1);
    } else {
      categories.push(categoryName);
    }
    
    setSelectedCategories(categories);
    filterNewsSourcesByCategory(categories);
  };

  const isCategoryActive = (categoryName: string) => {
    return selectedCategories.includes(categoryName);
  };

  const renderCategoryIconByActivity = (categoryName: string) => {
    return selectedCategories.includes(categoryName) ? (
      <img src="/assets/icon-select.svg" alt="select"/>
    ) : (
      <img src="/assets/icon-plus.svg" alt="plus"/>
    );
  };

  return (
    <div className="filter">
      <button className="badge">News</button>
      {categories.map((category) => (
        <button key={category} className={`filterBtn ${isCategoryActive(category) && "active"}`} onClick={() => toggleCategory(category)}>
          {renderCategoryIconByActivity(category)} {category}
        </button>
      ))}
    </div>
  );
}

export default Filter;
