using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Hayatsune.Startup))]
namespace Hayatsune
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
