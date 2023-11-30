import categories from "./Categories";

let categoriesInFormat = [];
for (const [bigCategory, smallCategories] of Object.entries(categories)) {
  let objectInFormat = {
    pageName: bigCategory,
    pagePath: smallCategories.length > 1 ? '' : `/category/${bigCategory}/All`,
    category: true,
    singleCategory: smallCategories.length > 1 ? false : true,
    smallCategories: [],
  };
  if (smallCategories.length > 1) {
    objectInFormat.smallCategories.push({
      pageName: 'All',
      pagePath: `/category/${bigCategory}/All`
    });
    objectInFormat.smallCategories.push(...smallCategories.map((smallCategory) => {
      return {
        pageName: smallCategory,
        pagePath: `/category/${bigCategory}/${smallCategory}`,
      };
    }));
  }
  categoriesInFormat.push(objectInFormat);
}

const NavContents = [
  ...categoriesInFormat,
  { category: false, pageName: "Brands", pagePath: "/Brands" },
];

export default NavContents;