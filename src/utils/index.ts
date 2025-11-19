export const removeDuplicates = (arr: any[]): any[] => {
  const newArr: any[] = [];
  arr.forEach((element: any) => {
    if (!newArr.includes(element)) {
      newArr.push(element);
    }
  });
  return newArr;
};

