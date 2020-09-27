using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StarlightHotels.Models.ViewModels
{
    public class AccountViewModel
    {
        public string UserName { get; set; }

        public string Nom { get; set; }

        public string Prenom { get; set; }

        public DateTime DateNaissance { get; set; }

        public string Sexe { get; set; }

        public string Rue { get; set; }

        public string NumeroRue { get; set; }

        public string CodePostal { get; set; }

        public string Ville { get; set; }

        public int PaysId { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FullName { get; set; }

        // public string Role { get; set; }
    }
}