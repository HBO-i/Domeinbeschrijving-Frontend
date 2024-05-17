import React, {FunctionComponent} from 'react';
import {Page, route, useLocale} from 'b302-frontend-library';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {useDescriptionIndexQuery, useProfessionSkillsQuery} from '../../data/query/Query';
import Title from '../partials/Title';
import Loader from '../partials/Loader';
import DescriptionItemBlock from '../partials/TextItem/DescriptionItemBlock';
import {professionalSkillsToDescriptionItems} from '../../utils/Util';

const SearchPage: FunctionComponent = () => {
    const {__} = useLocale();
    const navigate = useNavigate();
    const [params] = useSearchParams();

    const request = { search: params.get('search') ?? undefined };

    const skills = useProfessionSkillsQuery(request);
    const tasks = useDescriptionIndexQuery(request);

    const loaded = skills.isSuccess && tasks.isFetched;
    const resultsFound = [skills, tasks].findIndex(q => q.data ? q.data.length > 0 : false) !== -1;

    const ResultSection = (props: { data: any[], title: string, start?: number }) => {
        const bigLevels: number[] = [];

        return (
            <div className={'search-page__result-section'}>
                <Title small>{props.title}</Title>
                {props.data.map((item, index) => (
                    <DescriptionItemBlock item={item} bigLevels={bigLevels} highlight={request.search} start={props.start} key={item.id} />
                ))}
            </div>
        );
    };

    console.log([
        loaded,
        resultsFound,
        {
            skills: skills.data,
            tasks: tasks.data
        }
    ]);

    if (!request.search)
        navigate(route('home'));

    return (
        <Page className={'search-page'}>
            <div className={'search-page__header'}>
                <Title>{__('searchResults')}</Title>
            </div>

            { !loaded &&
                <div className={'flex flex--justify-center'}>
                    <Loader />
                </div>
            }

            { loaded && <>
                { !resultsFound &&
                    <h2>{ __('noResultsFor') } "{request.search}".</h2>
                }

                { (resultsFound && tasks.data!.length > 0) &&
                    <ResultSection data={tasks.data!} title={__('professionTasks')} />
                }

                { (resultsFound && skills.data!.length > 0) &&
                    <div className={'search-page__result--skills'}>
                        <ResultSection data={professionalSkillsToDescriptionItems(skills.data!)} title={'Professional Skills'} start={1} />
                    </div>
                }
            </>}
        </Page>
    );
};

export default SearchPage;
