import {useQuery, keepPreviousData} from '@tanstack/react-query';

import FilterRepository from '../repo/FilterRepository';
import {DescriptionIndexRequest, ProfessionalSkillsIndexRequest} from '../Types';
import { useLocale } from 'b302-frontend-library';
import { localeId } from 'utils/Util';

export const useFilterIndexQuery = () => {
    const {locale} = useLocale();
    const repo = new FilterRepository();

    return useQuery({
        queryKey: ['filters', localeId(locale)],
        queryFn: () => repo.getOptions({
            language: localeId(locale),
        }),
    });
};

export const useDescriptionIndexQuery = (request: DescriptionIndexRequest) => {
    const {locale} = useLocale();
    const repo = new FilterRepository();

    const localeRequest: DescriptionIndexRequest = {
        ...request,
        language: localeId(locale)
    };

    return useQuery({
        queryKey: ['descriptions', localeRequest],
        queryFn: () => repo.getDescriptions(localeRequest),
        placeholderData: keepPreviousData
    });
};

export const useProfessionSkillsQuery = (request: ProfessionalSkillsIndexRequest) => {
    const {locale} = useLocale();
    const repo = new FilterRepository();

    const localeRequest: ProfessionalSkillsIndexRequest = {
        ...request,
        language: localeId(locale)
    };

    return useQuery({
        queryKey: ['profession-skills', localeRequest],
        queryFn: () => repo.getProfessionSkills(localeRequest),
        placeholderData: keepPreviousData
    });
};
