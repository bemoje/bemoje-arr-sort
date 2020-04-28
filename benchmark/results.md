Note: For short arrays, the speedup is insignificant or about the same. The more
data there is, the faster the algorithms of timsort become, proportionally.
Although timsort is a bit slower for short arrays, we're talking about a few
milliseconds. So the overall improvement from Array.prototype.sort is quite
unquestionable, imo.

| ArrayType                    | Length | arrSort | Array.prototype.sort | Times faster |
| ---------------------------- | ------ | ------- | -------------------- | ------------ |
| randomInt                    | 10     | 715     | 954                  | 1.33         |
| randomInt                    | 100    | 6878    | 14034                | 2.04         |
| randomInt                    | 1000   | 104597  | 210992               | 2.02         |
| randomInt                    | 10000  | 1560955 | 2804903              | 1.80         |
| descendingInt                | 10     | 571     | 389                  | 0.68         |
| descendingInt                | 100    | 1122    | 1971                 | 1.76         |
| descendingInt                | 1000   | 4946    | 17183                | 3.47         |
| descendingInt                | 10000  | 43319   | 170926               | 3.95         |
| ascendingInt                 | 10     | 534     | 369                  | 0.69         |
| ascendingInt                 | 100    | 1022    | 1842                 | 1.80         |
| ascendingInt                 | 1000   | 4460    | 16485                | 3.70         |
| ascendingInt                 | 10000  | 36601   | 157912               | 4.31         |
| ascending3RandomExchangesInt | 10     | 649     | 541                  | 0.83         |
| ascending3RandomExchangesInt | 100    | 1757    | 3817                 | 2.17         |
| ascending3RandomExchangesInt | 1000   | 6584    | 18115                | 2.75         |
| ascending3RandomExchangesInt | 10000  | 46194   | 172214               | 3.73         |
| ascending10RandomEndInt      | 10     | 792     | 750                  | 0.95         |
| ascending10RandomEndInt      | 100    | 2430    | 3578                 | 1.47         |
| ascending10RandomEndInt      | 1000   | 8165    | 19885                | 2.44         |
| ascending10RandomEndInt      | 10000  | 50357   | 176797               | 3.51         |
| allEqualInt                  | 10     | 526     | 397                  | 0.75         |
| allEqualInt                  | 100    | 1048    | 1949                 | 1.86         |
| allEqualInt                  | 1000   | 4400    | 16789                | 3.82         |
| allEqualInt                  | 10000  | 35976   | 162857               | 4.53         |
| manyDuplicateInt             | 10     | 833     | 770                  | 0.92         |
| manyDuplicateInt             | 100    | 7806    | 11705                | 1.50         |
| manyDuplicateInt             | 1000   | 110968  | 173539               | 1.56         |
| manyDuplicateInt             | 10000  | 1491473 | 2255993              | 1.51         |
| someDuplicateInt             | 10     | 797     | 747                  | 0.94         |
| someDuplicateInt             | 100    | 7797    | 11712                | 1.50         |
| someDuplicateInt             | 1000   | 112189  | 174973               | 1.56         |
| someDuplicateInt             | 10000  | 1526839 | 2301187              | 1.51         |
