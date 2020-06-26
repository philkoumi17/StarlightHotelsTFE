using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.API.Models
{
    [Table("Theme")]
    public class ThemeModel
    {
        [Key]
        [Display(Name = "THEME_Id")]
        public int Id { get; set; }

        [Display(Name = "THEME_Libelle")]
        [StringLength(50)]
        public string Libelle { get; set; }

        public ICollection<HotelThemeModel> HotelThemes { get; set; }
    }
}