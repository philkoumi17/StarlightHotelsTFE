using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace StarlightHotels.Models
{
    [Table("Pays")]
    public class PaysModel
    {
        [Key]
        [Column("PAYS_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("PAYS_Nom")]
        [Display(Name = "Nom")]
        [StringLength(50)]
        public string Nom { get; set; }

        public List<HotelModel> Hotels { get; set; }
        public List<ApplicationUser> ApplicationUsers { get; set; }
    }
}