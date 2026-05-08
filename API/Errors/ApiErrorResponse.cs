namespace API.Errors;

public class ApiErrorResponse(int statsCode, string message, string? details)
{
    public int StatsCode { get; set; } = statsCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
