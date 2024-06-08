import Dashboard from '../views/pages/dashboard';
import News from '../views/pages/news';
import Report from '../views/pages/report';
import DetailReport from '../views/pages/report_detail';

const routes = {
  '/': Dashboard,
  '/home': Dashboard,
  '/news': News,
  '/report': Report
  // '/detail/:id': DetailReport,
};

export default routes;
