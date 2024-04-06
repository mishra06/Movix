import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Populer:[],
    SearchSec:[],
    Movies:[],
    TVSHOWS:[],
    WhatsPopular:[],
    TopRatedMovie:[],
    Genres:[],
    TvGenres:[],
    SortBy:[],
    Details:{},
    Credits:{},
    Similar :[],
    Recomend:[]
};

const movieSlice = createSlice({
    name:"movie",
    initialState,
    reducers : {
        Trending:(state,action)=>{
            state.Populer = action.payload;
        },
        Searched:(state,action)=>{
            state.SearchSec = action.payload
        },
        MoviesSec:(state,action)=>{
            state.Movies = action.payload
        },
        TvShows:(state,action)=>{
            state.TVSHOWS = action.payload
        },
        Populars:(state,action)=>{
            state.WhatsPopular = action.payload
        },
        TopRateds:(state,action)=>{
            state.TopRatedMovie = action.payload
        },
        SetGenres:(state,action)=>{
            state.Genres = action.payload
        },
        SetTvGenres:(state,action)=>{
            state.TvGenres = action.payload
        },
        SetSortBy:(state,action)=>{
            state.SortBy = action.payload
        },
        SetDetails:(state,action)=>{
            state.Details = action.payload
        },
        SetCredits:(state,action)=>{
            state.Credits = action.payload
        },
        SetSimilar:(state,action)=>{
            state.Similar = action.payload
        },
        SetRecomend:(state,action)=>{
            state.Recomend = action.payload
        }
    },   
});

export const {Trending,Searched,MoviesSec,TvShows,Populars,TopRateds,SetGenres,SetSortBy,SetDetails,SetTvGenres,SetCredits,SetSimilar,SetRecomend} = movieSlice.actions;

export default movieSlice.reducer; 