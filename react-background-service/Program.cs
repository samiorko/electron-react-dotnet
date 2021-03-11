using System;

namespace react_background_service
{
    class Program
    {
        static void Main(string[] args)
        {
            while (true)
            {
                var command = Console.ReadLine();
                Console.WriteLine($"Hello {command} from C#! Time is {DateTime.Now.ToShortTimeString()}.");
            }

        }
    }
}
