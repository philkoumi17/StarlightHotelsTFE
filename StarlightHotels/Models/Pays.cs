using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarmaniaHotels.API.Models
{
    [Table("Pays")]
    public class Pays
    {
        [Key]
        [Display(Name = "PAYS_Id")]
        public int Id { get; set; }

        [Display(Name = "PAYS_Nom")]
        [StringLength(50)]
        public string Nom { get; set; }

        public ICollection<Hotel> Hotels { get; set; }
        public ICollection<Client> Clients { get; set; }
    }
}