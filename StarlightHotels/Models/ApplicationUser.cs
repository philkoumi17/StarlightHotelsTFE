using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using StarlightHotels.API.Models;

namespace StarlightHotels.API.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Column(TypeName = "nvarchar(150)")]
        public string FullName { get; set; }

        public ICollection<Client> Clients { get; set; }
    }
}