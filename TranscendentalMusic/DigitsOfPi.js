/// <summary>
/// Returns a range of hexadecimal digits of pi.
/// </summary>
/// <param name="start">The starting location of the range.</param>
/// <param name="count">The number of digits to return.</param>
/// <returns>An array containing the hexadecimal digits.</returns>

var DigitsPerSum = 8;
var Epsilon = 1e-17;

function GetDigits(start, count)
{
    var digits = new Array();
    var sumOfSeries = 0;

    for (i = 0; i < count; i++)
    {
        if (i % DigitsPerSum == 0)
        {
            sumOfSeries = 4 * Sum(1, start)
                    - 2 * Sum(4, start)
                    - Sum(5, start)
                    - Sum(6, start);

            start += DigitsPerSum;
        }

        sumOfSeries = 16 * (sumOfSeries - Math.floor(sumOfSeries));
        digits.push(Math.floor(sumOfSeries));
    }

    return digits;
}

/// <summary>
/// Returns the sum of 16^(n - k)/(8 * k + m) from 0 to k.
/// </summary>
/// <param name="m"></param>
/// <param name="n"></param>
/// <returns></returns>
function Sum(m, n)
{
    var sum = 0;
    var d = m;
    var power = n;

    while (true)
    {
        if (power > 0)
            term = HexExponentModulo(power, d) / d;
        else
        {
            term = Math.pow(16, power) / d;
            if (term < Epsilon)
                break;
        }

        sum += term;
        power--;
        d += 8;
    }

    return sum;
}

/// <summary>
/// Return 16^p mod m.
/// </summary>
/// <param name="p"></param>
/// <param name="m"></param>
/// <returns></returns>
function HexExponentModulo(p, m) {
    var power = 1;
    while (power * 2 <= p)
        power *= 2;

    var result = 1;

    while (power >= 1) {
        if (p >= power) {
            result *= 16;
            result %= m;
            p -= power;
        }

        power /= 2;

        if (power >= 1) {
            result *= result;
            result %= m;
        }
    }

    return result;
}