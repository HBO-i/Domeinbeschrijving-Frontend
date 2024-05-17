import {RouteContainer} from 'b302-frontend-library';
import Home from '../components/pages/Home';
import Universities from '../components/pages/Universities';
import ProfessionTasks from '../components/pages/ProfessionTasks';
import ProfessionalSkills from '../components/pages/ProfessionalSkills';
import SearchPage from 'components/pages/SearchPage';

const routes = new RouteContainer();

routes.add('/', Home, 'home');
routes.add('/universities', Universities, 'universities');
routes.add('/tasks', ProfessionTasks, 'tasks');
routes.add('/professional-skills', ProfessionalSkills, 'skills');
routes.add('/search', SearchPage, 'search');

export default routes.getRoutes();
