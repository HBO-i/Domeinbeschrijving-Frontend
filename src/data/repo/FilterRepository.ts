import {Repository, RequestMethod} from 'b302-frontend-library';
import {
    DescriptionIndexRequest,
    DescriptionIndexResponse,
    FilterOptionsResponse, ProfessionalSkillsIndexRequest,
    ProfessionSkillIndexResponse,
    RequestWithLang
} from '../Types';

class FilterRepository extends Repository {

    constructor() {
        super('/filters');
    }

    getOptions(request: RequestWithLang) {
        return this.requestWithOptions<FilterOptionsResponse>(this.url(), RequestMethod.GET, {
            params: {
                ...request
            }
        }).send();
    }

    getDescriptions(request: DescriptionIndexRequest) {
        return this.requestWithOptions<DescriptionIndexResponse>('/descriptions', RequestMethod.GET, {
            params: {...request}
        }).sendRaw();
    }

    getProfessionSkills(request: ProfessionalSkillsIndexRequest) {
        return this.requestWithOptions<ProfessionSkillIndexResponse>(`/professional-skills`, RequestMethod.GET, {
            params: {...request}
        }).send();
    }
}

export default FilterRepository;
