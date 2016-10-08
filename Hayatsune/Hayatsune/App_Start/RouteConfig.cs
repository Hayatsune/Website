using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Hayatsune
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "About",
                url: "about",
                defaults: new { controller = "Home", action = "About" }
            );

            routes.MapRoute(
                name: "AboutVideo",
                url: "about-video",
                defaults: new { controller = "Home", action = "AboutVideo" }
            );

            routes.MapRoute(
                name: "Register",
                url: "register",
                defaults: new { controller = "Account", action = "Register" }
            );

            routes.MapRoute(
             name: "Signin",
             url: "signin",
             defaults: new { controller = "Account", action = "Login" }
         );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
