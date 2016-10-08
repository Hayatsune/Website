using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hayatsune.Models
{
    public class PictureModels
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public HttpPostedFileBase ImageUpload { get; set; }
    }
}