import {ProfessionSkillIndexResponse} from '../data/Types';

export const professionalSkillsToDescriptionItems = (data: ProfessionSkillIndexResponse) => {
    return data.map(p => ({
        ...p,
        items: p.competencies.map(c => ({
            ...c,
            items: [c.description.value]
        }))
    }));
};

/**
 * Gives a hint whether the browser the user is on is Safari.
 * It is not 100% accurate
 * 
 * @returns boolean
 */
export const hintIsSafari = () => navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome');

export const localeId = (locale: string) => {
    const localeMap: any = {
        nl: 1,
        en: 2
    };

    return localeMap[locale];
};