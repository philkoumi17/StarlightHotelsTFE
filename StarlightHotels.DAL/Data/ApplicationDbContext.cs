using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using StarlightHotels.Models;

namespace StarlightHotels.DAL.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options):base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Gestion pour la table HotelCategorie
            modelBuilder.Entity<HotelCategorieModel>()
                .HasKey(ht => new { ht.HotelId, ht.CatId });

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelCategories)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Categorie)
                .WithMany(t => t.HotelCategories)
                .HasForeignKey(pt => pt.CatId);

            // Gestion pour la table HotelFormule
            modelBuilder.Entity<HotelFormuleModel>()
                .HasKey(hf => new { hf.HotelId, hf.FormId });

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelFormules)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Formule)
                .WithMany(t => t.HotelFormules)
                .HasForeignKey(pt => pt.FormId);

            // Gestion pour la table HotelPromotion
            modelBuilder.Entity<HotelPromotionModel>()
                .HasKey(hp => new { hp.HotelId, hp.PromoId });

            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelPromotions)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Promotion)
                .WithMany(t => t.HotelPromotions)
                .HasForeignKey(pt => pt.PromoId);

            // Gestion pour la table HotelService
            modelBuilder.Entity<HotelServiceModel>()
                .HasKey(hs => new { hs.HotelId, hs.ServId });

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelServices)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Service)
                .WithMany(t => t.HotelServices)
                .HasForeignKey(pt => pt.ServId);

            // Gestion pour la table HotelTheme
            modelBuilder.Entity<HotelThemeModel>()
                .HasKey(ht => new { ht.HotelId, ht.ThemeId });

            modelBuilder.Entity<HotelThemeModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelThemes)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelThemeModel>()
                .HasOne(pt => pt.Theme)
                .WithMany(t => t.HotelThemes)
                .HasForeignKey(pt => pt.ThemeId);

            // Gestion pour la table ChambreReservee
            modelBuilder.Entity<ChambreReserveeModel>()
                .HasKey(ht => new { ht.ChNum, ht.IdRes });

            modelBuilder.Entity<ChambreReserveeModel>()
                .HasOne(pt => pt.Chambre)
                .WithMany(t => t.ChambreReservees)
                .HasForeignKey(pt => pt.ChNum);

            modelBuilder.Entity<ChambreReserveeModel>()
                .HasOne(pt => pt.Reservation)
                .WithMany(p => p.ChambreReservees)
                .HasForeignKey(pt => pt.IdRes)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // Autres relations
            modelBuilder.Entity<ReservationModel>()
                .HasOne(a => a.Facture)
                .WithOne(b => b.Reservation)
                .HasForeignKey<FactureModel>(b => b.ResId);

            modelBuilder.Entity<ClientModel>()
                .HasOne(a => a.Reservation)
                .WithOne(b => b.Client)
                .HasForeignKey<ReservationModel>(b => b.ClientId);

            modelBuilder.Entity<ParticipantModel>()
                .HasOne(a => a.Reservation)
                .WithOne(b => b.Participant)
                .HasForeignKey<ReservationModel>(b => b.PartId);
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<CategorieModel> Categories { get; set; }
        public DbSet<ChambreModel> Chambres { get; set; }
        public DbSet<ChambreReserveeModel> ChambreReservees { get; set; }
        public DbSet<ClientModel> Clients { get; set; }
        public DbSet<EtatModel> Etats { get; set; }
        public DbSet<FactureModel> Factures { get; set; }
        public DbSet<HotelModel> Hotels { get; set; }
        public DbSet<HotelCategorieModel> HotelCategories { get; set; }
        public DbSet<HotelFormuleModel> HotelFormules { get; set; }
        public DbSet<HotelPromotionModel> HotelPromotionModels { get; set; }
        public DbSet<HotelServiceModel> HotelServices { get; set; }
        public DbSet<HotelThemeModel> HotelThemes { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<ParticipantModel> Participants { get; set; }
        public DbSet<PaysModel> Pays { get; set; }
        public DbSet<PromotionModel> PromotionModels { get; set; }
        public DbSet<ReservationModel> Reservations { get; set; }
        public DbSet<ChambreReserveeModel> ReservationChambres { get; set; }
        public DbSet<SaisonModel> Saisons { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
        public DbSet<TarifModel> Tarifs { get; set; }
        public DbSet<ThemeModel> Themes { get; set; }
    }
}