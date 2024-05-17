import React, {FunctionComponent, useEffect, useMemo} from 'react';
import {Page, useLocale} from 'b302-frontend-library';
import { useSearchParams } from 'react-router-dom';

import Title from '../partials/Title';
import {useFilter} from '../contexts/FilterContext';
import {useDescriptionIndexQuery} from '../../data/query/Query';
import {DescriptionIndexRequest} from '../../data/Types';
import DescriptionItemBlock from '../partials/TextItem/DescriptionItemBlock';
import Loader from '../partials/Loader';
import Button from '../partials/Button';
import {FilterController} from '../../utils/Filter';

const ProfessionTasks: FunctionComponent = () => {
    const [params, setParams] = useSearchParams();
    const filter = useFilter();
    const {__} = useLocale();

    const request = useMemo<DescriptionIndexRequest>(() => {
        return {
            architecture_layer: filter.data.architecture_layers,
            level: filter.data.levels,
            activity: filter.data.activities,
            grouping: filter.data.grouping.join(',')
        };
    }, [filter.data]);

    const query = useDescriptionIndexQuery(request);

    const data = useMemo(() => {
        return query.data ?? [];
    }, [query.data]);

    useEffect(() => {
        filter.setActive(true);

        return () => {
            filter.reset();
            filter.setActive(false);
        };
    }, []);

    useEffect(() => {
        const levels = params.get('levels')?.split(',').map(i => parseInt(i)) ?? filter.data.levels;
        const architecture_layers = params.get('architecture_layers')?.split(',').map(i => parseInt(i)) ?? filter.data.architecture_layers;
        const activities = params.get('activities')?.split(',').map(i => parseInt(i)) ?? filter.data.activities;
        const grouping = params.get('grouping')?.split(',') ?? filter.data.grouping;

        filter.setData({ 
            levels: levels,
            architecture_layers, 
            activities, 
            grouping 
        });
    }, []);

    useEffect(() => {
        const data = filter.data;

        setParams({
            levels: data.levels.join(','),
            architecture_layers: data.architecture_layers.join(','),
            activities: data.activities.join(','),
            grouping: data.grouping.join(','),
        });
    }, [data]);

    const bigLevels: number[] = [];

    return (
        <Page className={'tasks-page'}>
            <div className={'tasks-page__header'}>
                <Title>{__('professionTasks')}</Title>

                <Button onClick={FilterController.toggle} secondary>
                    {__('filterAgain')}
                </Button>
            </div>

            { query.isInitialLoading &&
                <div className={'flex flex--justify-center'}>
                    <Loader />
                </div>
            }

            { !query.isInitialLoading &&
                <>
                    { !filter.filtersSelected &&
                        <>
                            <h2>{__('noFiltersSelected')}</h2>
                            <br />

                            <div className={'flex'}>
                                <Button onClick={FilterController.toggle} secondary>
                                    {__('openFilter')}
                                </Button>
                            </div>
                        </>
                    }

                    { filter.filtersSelected &&
                        <>
                            { data.map(item => (
                                <DescriptionItemBlock item={item} bigLevels={bigLevels} key={item.id} />
                            )) }
                        </>
                    }
                </>
            }
        </Page>
    );
};

export default ProfessionTasks;
