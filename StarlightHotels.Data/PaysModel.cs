using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

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

        public ICollection<HotelModel> Hotels { get; set; }
        public ICollection<ClientModel> Clients { get; set; }
    }
}