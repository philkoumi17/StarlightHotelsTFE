using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Theme")]
    public class ThemeModel
    {
        [Key]
        [Column("THEME_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("THEME_Libelle")]
        [Display(Name = "Libelle")]
        [StringLength(50)]
        public string Libelle { get; set; }

        public ICollection<HotelThemeModel> HotelThemes { get; set; }
    }
}