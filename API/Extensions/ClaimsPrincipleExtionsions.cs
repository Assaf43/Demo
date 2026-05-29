using System.Security.Authentication;
using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ClaimsPrincipleExtionsions
{
    public static async Task<AppUser> GetUserByEmail(this UserManager<AppUser> userManager, ClaimsPrincipal user)
    {
        var userToReturn = await userManager.Users.FirstOrDefaultAsync(x => x.Email == user.GetEmail()) 
            ?? throw new AuthenticationException("User claim not found");
        return userToReturn;
    }

    public static async Task<AppUser> GetUserByEmailWithAddress(this UserManager<AppUser> userManager, ClaimsPrincipal user)
    {
        var userToReturn = await userManager.Users
            .Include(x => x.Address)
            .FirstOrDefaultAsync(x => x.Email == user.GetEmail()) 
            ?? throw new AuthenticationException("User claim not found");
        return userToReturn;
    }

    public static string GetEmail(this ClaimsPrincipal emailPrincipal)
    {
        var email = emailPrincipal.FindFirstValue(ClaimTypes.Email) 
            ?? throw new AuthenticationException("Email claim not found");

        return email;
    } 
}
