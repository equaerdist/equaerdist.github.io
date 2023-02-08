using System;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;

namespace ServerExample
{
    class Program
    {
        static void Main(string[] args)
        {
            var listener = new HttpListener();
            listener.Prefixes.Add("http://localhost:5000/");
            listener.Start();

            Console.WriteLine("Listening for incoming requests...");
            while (true)
            {
                var context = listener.GetContext();
                var request = context.Request;
                var response = context.Response;

                if (request.HttpMethod == "GET")
                {
                    // check if the request URL ends with .css or .js
                    var fileExtension = Path.GetExtension(request.Url.LocalPath);
                    if (fileExtension == ".css" || fileExtension == ".js")
                    {
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), request.Url.LocalPath.Substring(1));
                        var fileBytes = File.ReadAllBytes(filePath);
                        var fileContent = Encoding.UTF8.GetString(fileBytes);

                        var buffer = Encoding.UTF8.GetBytes(fileContent);
                        response.ContentLength64 = buffer.Length;
                        response.OutputStream.Write(buffer, 0, buffer.Length);
                    }
                    else
                    {
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "main.html");
                        var fileBytes = File.ReadAllBytes(filePath);
                        var fileContent = Encoding.UTF8.GetString(fileBytes);

                        var buffer = Encoding.UTF8.GetBytes(fileContent);
                        response.ContentLength64 = buffer.Length;
                        response.OutputStream.Write(buffer, 0, buffer.Length);
                    }
                }
                else if (request.HttpMethod == "POST")
                {
                    var requestBody = new byte[request.ContentLength64];
                    request.InputStream.Read(requestBody, 0, requestBody.Length);
                    var requestText = Encoding.UTF8.GetString(requestBody);

                    // process the request and get the response string
                    var responseText = "";
                    responseText += requestText;

                    var buffer = Encoding.UTF8.GetBytes(responseText);
                    response.ContentLength64 = buffer.Length;
                    response.OutputStream.Write(buffer, 0, buffer.Length);
                    try
                    {
                        MailMessage mail = new MailMessage();
                        SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com");

                        mail.From = new MailAddress("vriyazzz1001@gmail.com");
                        mail.To.Add("vriyazzz100@yandex.ru");
                        mail.Subject = "Test Mail";
                        mail.Body = responseText;

                        SmtpServer.Port = 587;
                        SmtpServer.Credentials = new NetworkCredential("vriyazzz1001@gmail.com", "mgnczmfauxerkbfs");
                        SmtpServer.EnableSsl = true;

                        SmtpServer.Send(mail);
                        Console.WriteLine("mail sent");
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex.ToString());
                    }
                }

                response.Close();
            }
        }
    }
}
