import { createSlice } from '@reduxjs/toolkit';

const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    favorites: [],
    recentSearches: [],
  },
  reducers: {
    setWeather(state, action) {
      state.currentWeather = action.payload;
    },
    addFavorite(state, action) {
      state.favorites.push(action.payload);
    },
    addRecentSearch(state, action) {
      if (state.recentSearches.length >= 15) {
        state.recentSearches.shift();
      }
      state.recentSearches.push(action.payload);
    },
  },
});

export const { setWeather, addFavorite, addRecentSearch } = weatherSlice.actions;
export default weatherSlice.reducer;
