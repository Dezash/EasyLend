using easylend.Database;
using easylend.Entities;
using System;
using System.Linq;

namespace easylend.Helpers
{
    public static class DbSeeder
    {
        public static void SeedUsers(ApplicationContext context)
        {
            //context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            if (context.Users.Any())
                return;

            var user = new User
            {
                Email = "aisole@ktu.lt",
                Password = "myliutoma",
                Birthdate = DateTime.Now,
                Name = "Aistis",
                LastName = "Sekso Chuliganas",
                PersonalCode = "123456789",
                Address = "Kaunas University of Technology",
                PhoneNumber = "866969420",
                MinInterestRate = 0,
                Application = null
            };

            var user1 = new User
            {
                Email = "lilgab@ktu.lt",
                Password = "lmao",
                Birthdate = DateTime.Now,
                Name = "Gabrielius",
                LastName = "Laurinavičius",
                PersonalCode = "987654321",
                Address = "Tavo mamos namai",
                PhoneNumber = "863366789",
                MinInterestRate = 0,
                Application = null
            };

            var user2 = new User
            {
                Email = "manpab@ktu.lt",
                Password = "pass",
                Birthdate = DateTime.Now,
                Name = "Mantas",
                LastName = "Pabalys",
                PersonalCode = "123789456",
                Address = "Kaunas, Vilnius, Klaipėda",
                PhoneNumber = "867799123",
                MinInterestRate = 0,
                Application = null
            };

            context.Users.Add(user);
            context.Users.Add(user1);
            context.Users.Add(user2);

            context.SaveChanges();
        }

        public static void SeedApplications(ApplicationContext context)
        {
            context.Database.EnsureCreated();

            if (context.Applications.Any())
                return;

            var aistis = context.Users.SingleOrDefault(x => x.Name == "Aistis");
            var application = new Application()
            {
                Date = DateTime.Now,
                Status = Status.Pending
            };

            var document1 = new Document()
            {
                Url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            };

            var document2 = new Document()
            {
                Url = "https://www.youtube.com/watch?v=FF0bA3kVSMo"
            };


            application.User = aistis;
            application.Documents.Add(document1);
            application.Documents.Add(document2);
            context.Applications.Add(application);

            context.SaveChanges();
        }
    }
}
