import Vue from "vue";
import VueRouter from "vue-router";
import {
  RawLocation,
  Route,
  RouteConfig,
  RouterMode,
  RouterOptions
} from "vue-router/types/router";
import CompanyInfo from "@/helpers/companyInfo";

// Named routes to be used when programmatically navigating
export class Routes {
  public static readonly Home: string = "home";
  public static readonly ModernSlaveryAct: string = 'modern-slavery-act'
  public static readonly PageNotFound: string = "page-not-found";
}

/**
 * Describes vue-router configuration.
 *
 * More info: http://router.vuejs.org/en/
 */
export default class Router implements RouterOptions {
  public routes: RouteConfig[] = [
    {
      path: "/",
      name: Routes.Home,
      component: () => import("@/views/Home.vue"),
      meta: {
        title: "Home"
      }
    },
    {
      path: '/policies/modern-slavery-act',
      name: Routes.ModernSlaveryAct,
      component: () => import("@/views/Policies/ModernSlaveryAct.vue")
    },
    {
      path: "*",
      name: Routes.PageNotFound,
      component: () => import("@/views/PageNotFound.vue"),
      meta: {
        title: "Page not found"
      }
    }
  ];

  public mode: RouterMode = "history";

  private readonly router: VueRouter;

  public constructor() {
    Vue.use(VueRouter);

    this.router = new VueRouter(this);

    this.router.beforeEach(Router.beforeEach);
  }

  public get instance(): VueRouter {
    return this.router;
  }

  private static async beforeEach(
    to: Route,
    from: Route,
    /* eslint-disable-next-line */
    next: (to?: RawLocation | false | ((vm: Vue) => any) | void) => void
  ) {
    // Set <title>
    if (to.meta.title) {
      document.title = to.meta.title + " | " + CompanyInfo.companyName;
    } else {
      document.title = CompanyInfo.companyName;
    }
    // TODO: Uncomment and refactor below for meta data for SEO
    // if (to.meta.description) {
    //   let tag = document.createElement('meta');
    //   tag.setAttribute('name', 'description');
    //   tag.setAttribute('content', to.meta.description);
    //   document.head.appendChild(tag);
    // }

    next();
  }
}
