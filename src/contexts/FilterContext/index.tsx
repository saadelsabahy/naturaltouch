import React from 'react';
import {View, Text} from 'react-native';
import reactotron from 'reactotron-react-native';

interface Props {
  children: React.ReactNode;
}
type selectedItemsType = {[title: string]: string};
type contextTypes = {
  selectedItems: selectedItemsType;
  onItemPressed: (item: string, title: string) => void;
  resetSelectedItems: () => void;
};

export const FilterContext = React.createContext<contextTypes>(
  {} as contextTypes,
);
const FilterProvider = ({children}: Props) => {
  const [selectedItems, setselectedItems] = React.useState<selectedItemsType>(
    {} as selectedItemsType,
  );

  const onItemPressed = (item: string, title: string) => {
    if (selectedItems[`${title}`] == item) {
      let newState = Object.assign({}, selectedItems);
      delete newState[`${title}`];

      setselectedItems(newState);
    } else {
      setselectedItems((prev) => ({
        ...prev,
        [`${title}`]: item,
      }));
    }
  };

  const resetSelectedItems = () => setselectedItems({});
  return (
    <FilterContext.Provider
      value={{selectedItems, onItemPressed, resetSelectedItems}}>
      {children}
    </FilterContext.Provider>
  );
};

export {FilterProvider};
