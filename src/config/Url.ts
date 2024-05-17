import { useLocale } from "b302-frontend-library";
import { localeId } from "utils/Util";

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const useDownloadURLS = (): any => {
    const {locale} = useLocale();

    return {
        docs: `${API_ENDPOINT}/docs`,
        pdf: `${API_ENDPOINT}/storage/pdf/HBOi_Domeinbeschrijving_2023_${locale === 'nl' ? 'NL' : 'ENG'}.pdf`,
        excel_sheet: `${API_ENDPOINT}/storage/excel/DB23_kubus_${locale === 'nl' ? 'NL' : 'EN'}.xlsx`,
        json: `${API_ENDPOINT}/api/export?grouping=architecture_layers,activities,levels&language=${localeId(locale)}`
    };
};
