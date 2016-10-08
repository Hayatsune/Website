using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hayatsune.Models
{
    public class CategoryModels
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public virtual IList<PostModels> Posts { get; set; }
    }
}