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
            
            /* Many-to-many relationships */

            // Gestion pour la table HotelCategorie
            modelBuilder.Entity<HotelCategorieModel>()
                .HasKey(ht => new { ht.HotelId, ht.CategorieId });

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelCategories)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelCategorieModel>()
                .HasOne(pt => pt.Categorie)
                .WithMany(t => t.HotelCategories)
                .HasForeignKey(pt => pt.CategorieId);

            // Gestion pour la table HotelFormule
            modelBuilder.Entity<HotelFormuleModel>()
                .HasKey(hf => new { hf.HotelId, hf.FormuleId });

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelFormules)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelFormuleModel>()
                .HasOne(pt => pt.Formule)
                .WithMany(t => t.HotelFormules)
                .HasForeignKey(pt => pt.FormuleId);

            // Gestion pour la table HotelPromotion
            modelBuilder.Entity<HotelPromotionModel>()
                .HasKey(hp => new { hp.HotelId, hp.PromotionId });

            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelPromotions)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelPromotionModel>()
                .HasOne(pt => pt.Promotion)
                .WithMany(t => t.HotelPromotions)
                .HasForeignKey(pt => pt.PromotionId);

            // Gestion pour la table HotelService
            modelBuilder.Entity<HotelServiceModel>()
                .HasKey(hs => new { hs.HotelId, hs.ServiceId });

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Hotel)
                .WithMany(p => p.HotelServices)
                .HasForeignKey(pt => pt.HotelId);

            modelBuilder.Entity<HotelServiceModel>()
                .HasOne(pt => pt.Service)
                .WithMany(t => t.HotelServices)
                .HasForeignKey(pt => pt.ServiceId);

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

            // Gestion pour la table ChambreReserveeService
            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasKey(hp => new { hp.ChambreReserveeId, hp.ServiceId });

            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasOne(pt => pt.ChambreReservee)
                .WithMany(t => t.ChambreReserveeServices)
                .HasForeignKey(pt => pt.ChambreReserveeId);

            modelBuilder.Entity<ChambreReserveeServiceModel>()
                .HasOne(pt => pt.Service)
                .WithMany(p => p.ChambreReserveeServices)
                .HasForeignKey(pt => pt.ServiceId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // Gestion pour la table ParticipantReservation
            modelBuilder.Entity<ParticipantReservationModel>()
                .HasKey(pr => new { pr.ParticipantId, pr.ReservationId });

            modelBuilder.Entity<ParticipantReservationModel>()
                .HasOne(pt => pt.Participant)
                .WithMany(p => p.ParticipantReservations)
                .HasForeignKey(pt => pt.ParticipantId);

            modelBuilder.Entity<ParticipantReservationModel>()
                .HasOne(pt => pt.Reservation)
                .WithMany(t => t.ParticipantReservations)
                .HasForeignKey(pt => pt.ReservationId)
                .OnDelete(DeleteBehavior.ClientSetNull);

            // Autres relations (One-to-one relationship)
            modelBuilder.Entity<ReservationModel>()
                .HasOne(a => a.Facture)
                .WithOne(b => b.Reservation)
                .HasForeignKey<FactureModel>(b => b.ReservationId);

            modelBuilder.Entity<ReservationModel>()
                .HasOne(n => n.ApplicationUser)
                .WithMany(a => a.Reservations)
                .HasForeignKey(n => n.ApplicationUserId)
                .OnDelete(DeleteBehavior.ClientSetNull);
        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<CategorieModel> Categories { get; set; }
        public DbSet<ChambreModel> Chambres { get; set; }
        public DbSet<ChambreReserveeModel> ChambreReservees { get; set; }
        public DbSet<ChambreReserveeServiceModel> ChambreReserveeServices { get; set; }
        public DbSet<EtatModel> Etats { get; set; }
        public DbSet<FactureModel> Factures { get; set; }
        public DbSet<FormuleModel> Formules { get; set; }
        public DbSet<HotelModel> Hotels { get; set; }
        public DbSet<HotelCategorieModel> HotelCategories { get; set; }
        public DbSet<HotelFormuleModel> HotelFormules { get; set; }
        public DbSet<HotelPromotionModel> HotelPromotions { get; set; }
        public DbSet<HotelServiceModel> HotelServices { get; set; }
        public DbSet<HotelThemeModel> HotelThemes { get; set; }
        public DbSet<ImageModel> Images { get; set; }
        public DbSet<ParticipantModel> Participants { get; set; }
        public DbSet<ParticipantReservationModel> ParticipantReservations { get; set; }
        public DbSet<PaysModel> Pays { get; set; }
        public DbSet<PromotionModel> Promotions { get; set; }
        public DbSet<ReservationModel> Reservations { get; set; }
        public DbSet<SaisonModel> Saisons { get; set; }
        public DbSet<ServiceModel> Services { get; set; }
        public DbSet<TarifModel> Tarifs { get; set; }
        public DbSet<ThemeModel> Themes { get; set; }
    }
}