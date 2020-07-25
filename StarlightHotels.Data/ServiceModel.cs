using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models
{
    [Table("Service")]
    public class ServiceModel
    {
        [Key]
        [Column("SERV_Id")]
        [Display(Name = "Id")]
        public int Id { get; set; }

        [Column("SERV_Description")]
        [Display(Name = "Description")]
        [DataType(DataType.MultilineText)]
        [StringLength(255)]
        public string Description { get; set; }

        [Column("SERV_Payant")]
        [Display(Name = "Payant")]
        public bool Payant { get; set; }

        public ICollection<HotelServiceModel> HotelServices { get; set; }
    }
}