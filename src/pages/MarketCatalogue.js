import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';

// Search utils
const fuzzySearch = (query, word) => {
  const patternArray = [...query];
  const wordArray = Array.from(word);
  let matchedIndexes = [];
  let matchedCharacters = [];

  for (let i = 0; i < patternArray.length; i++) {
    let currentIndex = wordArray.indexOf(patternArray[i]);

    while (!!~currentIndex) {
      if (!matchedCharacters.includes(patternArray[i])) {
        matchedCharacters.push(patternArray[i]);
      }

      matchedIndexes.push(currentIndex);

      currentIndex = wordArray.indexOf(patternArray[i], currentIndex + 1);
    }
  }

  return matchedCharacters.length === patternArray.length;
};

const search = (hasFuzzySearch, searchQuery, list) => {
  let results = [];

  if (hasFuzzySearch) {
    list.forEach(({ title }, index, arr) => {
      const query = searchQuery.toLowerCase();
      const word = title.toLowerCase();

      if (fuzzySearch(query, word)) {
        results.push(arr[index]);
      }
    });
  } else {
    list.forEach(({ title }, index, arr) => {
      if (title.toLowerCase().includes(searchQuery.toLowerCase())) {
        results.push(arr[index]);
      }
    });
  }

  return results;
};

// Components
const SearchInput = ({ onSearch }) => (
  <input
    className="mc_buttons__select"
    type="search"
    placeholder="search product"
    onInput={onSearch}
  />
);

const CatalogueList = ({ productList, onClick, selectedId, detailsText }) =>
  productList.map(({ title, price, id, image }) => (
    <div
      className="mc_product"
      onClick={() => {
        const newId = selectedId === id ? null : id;
        onClick(newId);
      }}
    >
      {selectedId === id ? (
        <p>{detailsText}</p>
      ) : (
        <>
          <p className="mc_product__title">{title}</p>
          <img className="mc_product_img" src={image} alt="" />
          <p className="mc_price">
            <strong>{`${price}$`}</strong>
          </p>
        </>
      )}
    </div>
  ));

export const MarketCatalogue = () => {
  const [loading, setLoadingStatus] = useState();
  const [productList, setProductList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const [selectedId, setSelectedId] = useState();
  const [detailsText, setDetailsText] = useState();
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setLoadingStatus(true);
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((json) => {
        setProductList(json);
        setAllProducts(json);
        setLoadingStatus(false);
      });
    fetch('https://fakestoreapi.com/products/categories')
      .then((res) => res.json())
      .then((json) => {
        setCategories(json);
      });
  }, []);

  useEffect(() => {
    if (!category) return;

    setLoadingStatus(true);
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((json) => {
        setProductList(json);
        setLoadingStatus(false);
      });
  }, [category]);

  const showProduct = (id) => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((json) => {
        const { description } = json;

        setSelectedId(id);
        setDetailsText(description);
      });
  };

  const onSearch = ({ target: { value } }) => {
    if (value) {
      const newProductList = search(false, value, allProducts);
      setProductList(newProductList);
    } else {
      setProductList(allProducts);
    }
  };

  return (
    <>
      <Header
        title="Market Catalogue"
        imgSrc="https://cdn-icons-png.flaticon.com/512/3703/3703259.png"
        hasBackButton
      />
      <div className="mc_wrapper">
        <div className="sort_buttons mc_buttons">
          <button
            className="sort_buttons__unit"
            onClick={() => {
              setProductList(productList.sort((a, b) => b.price - a.price));
            }}
          >
            <img
              className="sort_buttons__icon"
              src="https://cdn-icons-png.flaticon.com/512/57/57055.png"
              alt="sort to down"
            />
          </button>
          <button
            className="sort_buttons__unit"
            onClick={() => {
              setProductList(productList.sort((a, b) => a.price - b.price));
            }}
          >
            <img
              className="sort_buttons__icon"
              src="https://cdn-icons-png.flaticon.com/512/4655/4655143.png"
              alt="sort to up"
            />
          </button>
          <select
            className="mc_buttons__select"
            onChange={({ target: { value } }) => setCategory(value)}
          >
            <option value="" hidden>
              choose category
            </option>
            {categories.map((cat) => (
              <option value={cat}>{cat}</option>
            ))}
          </select>
          <SearchInput onSearch={onSearch} />
        </div>
        {loading ? (
          <div className="load-message">Loading</div>
        ) : (
          <CatalogueList
            productList={productList}
            onClick={showProduct}
            selectedId={selectedId}
            detailsText={detailsText}
          />
        )}
      </div>
    </>
  );
};
