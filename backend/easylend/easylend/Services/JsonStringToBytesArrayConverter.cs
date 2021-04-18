using System.Text;
using AutoMapper;

namespace easylend.Services
{
    public class JsonStringToBytesArrayConverter : ITypeConverter<string, byte[]>
    {
        public byte[] Convert(string source, byte[] destination, ResolutionContext context)
        {
            var encoding = new UTF8Encoding();
            return encoding.GetBytes(source.Substring(1, source.Length - 2));
        }

        public byte[] StringToBytes(string jsonString)
        {
            var encoding = new UTF8Encoding();
            return encoding.GetBytes(jsonString.Substring(1, jsonString.Length - 2));
        }
    }
}
