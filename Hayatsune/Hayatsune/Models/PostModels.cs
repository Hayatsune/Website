using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hayatsune.Models
{
    public class PostModels
    {
        public int ID { get; set; }
        public AuthorModels Author { get; set; }
        public CategoryModels Category { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public Boolean Published { get; set; }
        public DateTime ReleaseDate { get; set; }
        public DateTime ModifiedOn { get; set; }
        public virtual List<PictureModels> Picture { get; set; }
    }
}