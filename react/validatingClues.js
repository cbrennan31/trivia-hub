
invalidIDsArrayTwo = [
129204, 129205, 129292, 129324, 129442, 129443, 129505, 129567, 129592, 129596,
129656, 129713, 129805, 129836, 129862, 129864, 129865, 129866, 129893, 129952,
129983, 130012, 130016, 130017, 130043, 130044, 130072, 130104, 130132, 130162,
130163, 130165, 130285, 130344, 130377, 130402, 130527, 130582, 130586, 130644,
130732, 130735, 130736, 130764, 130767, 130852, 130972, 131034, 131066, 131182,
131185, 131274, 131276, 131337, 131362, 131396, 131426, 131453, 131454, 131455,
131542, 131547, 131604, 131633, 131637, 131693, 131721, 131722, 154103, 152572,
152633, 152634, 152661, 152691, 152751, 152753, 152783, 152784, 152814, 152871,
152901, 152902, 152964, 153026, 153051, 153055, 153056, 153086, 153116, 153264,
153295, 153321, 153323, 153324, 153325, 153352, 153384, 153411, 153414, 153442,
153473, 153475, 153476, 153502, 153503, 153531, 153533, 153536, 153563, 153591,
153621, 154132, 154194, 154195, 154223, 154226, 154253, 154283, 154372, 154404,
154525, 154641, 154643, 154644, 154702, 154733, 154766, 154821, 154824, 154855,
154885, 154912, 154913, 155001, 155063, 155092, 155096, 155152, 155334, 155361,
155420, 155422, 155451, 155452, 155480, 155510, 155631, 155633, 155660, 155664,
155665, 155691, 155780, 155781, 155842, 155844, 155874, 155900, 155904, 155995,
156051, 156141, 156171, 156173, 156201, 156293, 156352, 156354, 156381, 156411,
156441, 156442, 156470, 156500, 156501, 156590, 156592, 156623, 156625, 156654,
156680, 156801, 154735, 130074, 156208, 129361, 131184
]

invalidIDsArrayFour = [
156208, 129298, 129299, 129302, 129330, 129358, 129358, 129362, 129388, 129453,
129478, 129508, 129600, 129633, 129689, 129690, 129691, 129719, 129751, 129751,
129811, 129813, 129871, 129872, 129899, 129958, 129988, 130049, 130080, 130082,
130109, 130138, 130141, 130142, 130171, 130172, 130198, 130201, 130262, 130320,
130348, 130349, 130350, 130378, 130410, 130499, 130529, 130533, 130558, 130561,
130592, 130622, 130648, 130679, 130770, 130800, 130863, 130888, 130918, 131013,
131070, 131071, 131128, 131188, 131191, 131221, 152697, 152701, 152757, 152758,
152761, 152789, 152817, 152820, 152821, 152847, 152912, 152937, 152967, 153059,
153089, 153092, 153148, 153149, 153150, 153178, 153210, 153268, 153270, 153272,
153330, 153331, 153358, 153417, 153447, 153508, 153541, 153597, 153600, 153601,
153630, 153631, 153657, 153660, 153807, 153808, 153809, 153837, 153869, 153958,
153988, 153992, 154017, 154020, 154051, 154081, 154107, 154138, 154167, 153721,
154229, 154259, 154322, 154347, 154377, 154472, 154499, 154529, 154587, 154647,
154680, 154771, 154827, 154857, 154860, 154888, 154890, 154948, 154982, 155007,
155009, 155012, 155040, 155127, 155129, 155131, 155341, 155400, 155431, 155458,
155461, 155490, 155517, 155579, 155611, 155640, 155641, 155666, 155696, 155697,
155729, 155730, 155756, 155758, 155760, 155761, 155821, 155881, 155906, 155938,
155997, 155998, 156000, 156207, 156026, 156057, 156090, 156116, 156147, 156271,
156298, 156299, 156329, 156358, 156387, 156391, 156478, 156507, 156511, 156539,
156569, 156629, 156631, 156656, 156660, 156716, 156747, 156778, 153779, 156180,
156541
]

//
// Goal: 1000 clues for each value
// Max date: 2014-09-18
// //
// // Progress:
// //   $200:
//
//       - Max offset: 1201
//       - Clues to choose from: 1301
//       - Clues completed: all
//       - Clues validated: around 850 (repeats)
//       - Clues repeated: 200-300
//
//    $400:
//      - Max offset: 1165
//      - Clues to choose from: 1265
//      - Clues completed: 1265
//      - Clues repeated: 400
//      - Clues validated: around 744
//
//
// When finished with all values, change offset for each value to the max offset
// (100 less than "clues to choose from")
