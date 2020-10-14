using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Core.Entities
{
    [Table("Theme")]
    public class ThemeModel
    {
        [Column("THEME_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("THEME_Libelle")]
        [Display(Name = "Libelle")]
        [StringLength(50)]
        public string Libelle { get; set; }

        public List<HotelThemeModel> HotelThemes { get; set; }
    }
}