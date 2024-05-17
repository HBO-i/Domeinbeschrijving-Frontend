import React, {createContext, FunctionComponent, useContext, useEffect, useState} from 'react';
import {useFilterIndexQuery} from '../../data/query/Query';
import {useSearchParams} from 'react-router-dom';

export interface HBOFilterData {
    activities: number[];
    architecture_layers: number[];
    levels: number[];
    grouping: string[];
}

interface HBOFilter {
    data: HBOFilterData;
    setData: (data: HBOFilterData) => void;
    active: boolean;
    setActive: (active: boolean) => void;
    reset: () => void;
    empty: () => void;
    filtersSelected: boolean;
    allOn: boolean;
}

const HBOFilterContext = createContext<HBOFilter>({} as HBOFilter);

export const useFilter = () => useContext<HBOFilter>(HBOFilterContext);

const FilterContextProvider: FunctionComponent<{ children: any }> = (props) => {
    const [params, setParams] = useSearchParams();
    const query = useFilterIndexQuery();
    const [active, setActive] = useState<boolean>(false);
    const [data, setData] = useState<HBOFilterData>({
        activities: [],
        architecture_layers: [],
        levels: [],
        grouping: ['architecture_layers', 'activities', 'levels'],
    });

    const reset = () => setData({
        levels: query.data?.levels.map(i => i.id) ?? [],
        architecture_layers: query.data?.architecture_layers.map(i => i.id) ?? [],
        activities: query.data?.activities.map(i => i.id) ?? [],
        grouping: ['architecture_layers', 'activities', 'levels'],
    });

    const empty = () => setData({
        levels: [],
        architecture_layers: [],
        activities: [],
        grouping: ['architecture_layers', 'activities', 'levels'],
    });

    const filter: HBOFilter = {
        data,
        setData,
        reset,
        empty,
        active, setActive,
        filtersSelected: (data.levels.concat(data.activities).concat(data.architecture_layers)).length > 0,
        allOn: (data.levels.concat(data.architecture_layers).concat(data.activities).length) === 
            query.data?.activities.concat(query.data.architecture_layers).concat(query.data.levels).length
    };

    return (
        <HBOFilterContext.Provider value={filter}>
            { props.children }
        </HBOFilterContext.Provider>
    );
};

export default FilterContextProvider;
