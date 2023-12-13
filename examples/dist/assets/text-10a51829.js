import { l as loadStorage, c as clearStorage, s as saveStorage } from "./LocalStorage-f60767e1.js";
function getLoremIpsum(numCharacters) {
  if (numCharacters === void 0) {
    return loremIpsum;
  }
  let generatedText = "";
  while (numCharacters > 0) {
    generatedText += loremIpsum.slice(0, numCharacters);
    numCharacters -= loremIpsum.length;
  }
  return generatedText;
}
const loremIpsum = `Lorem ipsum dolor sit amet

Consectetur adipiscing elit. Vivamus id semper risus, et pharetra tortor. Quisque velit justo, euismod nec porttitor vel, elementum semper dolor. Cras eget sapien blandit, venenatis felis sit amet, rhoncus est. Integer efficitur eget urna ut convallis. Ut accumsan neque dapibus mollis faucibus. Nam nec lobortis leo. Nullam feugiat erat ac massa hendrerit, sit amet ornare nisi hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat volutpat. Sed feugiat blandit faucibus. Curabitur vel vestibulum orci. Fusce sit amet lectus pellentesque, viverra massa porttitor, ullamcorper mauris. Nulla at mauris eget est laoreet ullamcorper eget et diam. Vestibulum odio nisi, ultricies eget lacus ut, ullamcorper imperdiet turpis. Nulla et sapien neque.

Suspendisse sollicitudin posuere felis. Fusce cursus lacus enim, eu venenatis turpis ullamcorper a. Vestibulum tincidunt velit eget sodales porttitor. Integer eget nisl quis massa tincidunt pharetra. Integer ut leo varius, tempor augue sit amet, faucibus nunc. Phasellus dapibus blandit vestibulum. Suspendisse dapibus fringilla nibh. Aliquam metus leo, fermentum ut dictum nec, consequat non tortor. Nam malesuada, magna ac ultricies suscipit, arcu ante rhoncus augue, sed pharetra lectus sem eget lacus. Integer vitae laoreet tortor. Ut a augue dolor. Mauris gravida lacinia erat sit amet posuere. Nam lobortis quam a massa accumsan semper id ut metus.

Vivamus consectetur ex magna, non mollis lacus sollicitudin eu. Suspendisse et tellus congue, fringilla urna non, accumsan mi. Aliquam erat volutpat. Maecenas est elit, sodales et blandit non, pellentesque non nunc. Vivamus tempor facilisis eros, vitae pretium mi egestas id. Cras interdum nunc tellus, sit amet tincidunt lacus placerat vel. Aenean nec lectus bibendum, ultricies tellus eu, eleifend eros. Nam hendrerit turpis egestas risus gravida, vitae pretium tellus vehicula. Duis at ex tincidunt, luctus orci quis, ornare tellus. Phasellus sit amet quam quis purus consectetur convallis.

Maecenas eu dictum enim. Aliquam a nunc vitae erat vestibulum aliquam. Nam tristique nibh eu nisi porta consectetur. Pellentesque et tempor mauris. Aenean tempus porta quam, rutrum vulputate ante gravida quis. Donec eget ullamcorper metus, ac egestas purus. Fusce non lacus dui.

Curabitur sit amet mi ut sem viverra porttitor vel a tortor. Morbi suscipit convallis ante, et interdum odio porttitor a. Proin viverra porttitor lorem a finibus. Morbi scelerisque facilisis libero, sit amet finibus leo tempus sed. Phasellus vel aliquet tortor. Proin feugiat magna posuere justo pulvinar sollicitudin. Cras a dui arcu. Nunc faucibus, tortor in dictum auctor, ligula metus eleifend lorem, ac mollis lorem eros vel odio.

Aenean pulvinar, purus non dapibus fringilla, lacus libero porttitor nisi, vitae fermentum lacus felis in dui. Sed varius risus quam, eu porttitor diam condimentum sed. Proin sit amet odio eu ligula placerat fringilla. Fusce turpis ante, fringilla venenatis gravida a, lacinia ut nunc. Morbi dignissim vulputate diam, quis tempus diam tincidunt convallis. Curabitur fringilla tincidunt ultricies. Praesent sollicitudin sapien nec erat auctor tempus. Vivamus aliquam ligula nec iaculis auctor. Proin quis lacus a leo mattis convallis at quis erat. Sed suscipit, arcu in posuere elementum, nisl dui pulvinar sem, sed luctus massa nibh id turpis. Nam nec libero non ipsum vestibulum hendrerit a sit amet mauris. Nulla diam nisl, dictum ut mauris vel, ullamcorper laoreet velit. In vehicula, odio et tincidunt porta, ipsum nibh hendrerit purus, in aliquet tortor tortor sit amet leo.

Vivamus accumsan id ex quis facilisis. Vestibulum condimentum est ac ultricies lacinia. Donec eget dui ex. Integer arcu libero, varius in leo aliquam, pretium iaculis sem. Phasellus ut sem nec turpis feugiat pharetra at eu justo. Nullam in dolor ullamcorper leo dapibus tempus lobortis ac quam. Nunc congue sapien at suscipit accumsan.

In condimentum auctor nisl, ac blandit dolor posuere et. Donec purus eros, pellentesque non cursus vel, rhoncus nec sapien. Vivamus ac purus sodales, pharetra risus a, efficitur leo. Nunc est nibh, laoreet a tempus vitae, accumsan pellentesque purus. Nullam interdum rutrum ex, et euismod purus vulputate ut. Aliquam in venenatis est. Morbi a tempus mauris, in posuere neque. Ut molestie, elit eget varius sagittis, urna nisi sagittis urna, quis suscipit risus libero eu nibh. Sed efficitur ligula a pulvinar pulvinar. Curabitur pretium augue maximus, aliquam justo et, viverra magna. Maecenas a porta mi. Vestibulum at eleifend eros, quis faucibus felis.

Suspendisse vel nisi ipsum. Quisque consequat id lorem sed iaculis. Duis congue, eros scelerisque consectetur commodo, orci nisi pulvinar ante, quis aliquet mauris tortor eget nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aenean molestie, ligula at faucibus scelerisque, elit odio imperdiet nisl, sed pharetra nulla leo non leo. Maecenas venenatis libero ipsum, id accumsan neque placerat pretium. Maecenas id tempor odio. Nulla semper posuere sapien, ac euismod ipsum. Suspendisse dictum, dolor sed ultricies semper, elit justo scelerisque tortor, a auctor risus est vel velit. Nunc iaculis nibh massa, a venenatis diam sagittis non. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec posuere nunc.

Donec facilisis dolor et mauris porta, egestas ultricies turpis hendrerit. Maecenas et odio dui. Phasellus aliquam purus ac dolor ultrices, vitae consectetur nibh tincidunt. Sed lobortis augue vitae lectus congue, ac fringilla leo consectetur. Ut mattis tortor eget tortor faucibus venenatis. Morbi eros massa, viverra at semper quis, porttitor in lacus. Aenean fermentum malesuada tortor, a tincidunt orci sagittis rhoncus. Nulla facilisi. Praesent iaculis vel justo non aliquam. Ut posuere egestas arcu eget commodo. Integer ipsum orci, vehicula non orci nec, varius congue lorem. Pellentesque quis maximus lectus, non commodo lacus. Morbi ornare ullamcorper diam, ut pretium est maximus id.

In hac habitasse platea dictumst. Morbi eu tortor id odio mollis ultrices quis eget ipsum. Integer dapibus et augue sed mollis. Donec maximus quam pulvinar elit convallis tincidunt. Integer tempor gravida nulla nec aliquet. Nulla mollis orci at ligula mattis elementum. Nullam vel ullamcorper lorem. Donec cursus diam non est aliquet hendrerit. Ut suscipit lacus sed nisi varius lacinia. Vestibulum nec erat dapibus, venenatis felis ut, vulputate elit.

Duis cursus egestas rutrum. Aenean quis aliquam justo. Sed porttitor vitae nisl ornare rutrum. In vehicula massa sed quam porta faucibus. Nam turpis urna, sodales a lorem vel, lacinia porttitor mi. Aenean blandit arcu egestas, fermentum eros aliquam, ornare ipsum. Aliquam sollicitudin convallis nibh, sit amet cursus nisl gravida et. Aliquam dapibus tincidunt dui euismod efficitur. Integer erat orci, lobortis a porttitor dictum, interdum a mauris. Duis consectetur tortor lorem, eget suscipit lectus vulputate vitae. Cras imperdiet euismod laoreet. Sed ante nisl, ullamcorper eget iaculis at, pretium a mauris. Nullam libero ligula, tincidunt at tempor nec, dignissim a risus. Etiam at diam ac eros feugiat faucibus.

Nulla pulvinar nibh augue, non tincidunt nibh porta id. Nunc nec mauris justo. Maecenas vel felis eget ipsum consectetur eleifend sed et lacus. Aliquam sollicitudin tellus nisl, nec rutrum lacus aliquam in. Suspendisse eleifend, massa et semper efficitur, leo diam maximus nisi, eget dictum arcu urna quis massa. Proin viverra aliquet massa. Suspendisse aliquam metus a velit pretium lacinia. Integer iaculis tempor lectus, eget tristique nunc gravida eu. Fusce sem odio, ultrices in maximus vitae, lacinia et nisl. Vestibulum vel dolor accumsan, lobortis sapien condimentum, fringilla risus. Praesent et tincidunt nisl, ut efficitur est.

Proin quis suscipit lorem, quis accumsan tortor. Quisque interdum tortor malesuada augue sollicitudin faucibus. Donec egestas ligula at euismod imperdiet. Etiam elit lorem, commodo a tellus eget, vulputate viverra mi. Fusce efficitur purus metus, vitae imperdiet elit finibus ac. Suspendisse dignissim auctor mollis. Nam vitae dictum est. Duis maximus lobortis sem ut aliquet. Curabitur aliquam erat eu tempor blandit. Integer lectus velit, blandit et lacinia nec, tincidunt ac nisl.

Vestibulum volutpat, massa molestie tempus tempus, ex dui ultrices tortor, nec ullamcorper ex lorem sit amet leo. Morbi ut sollicitudin urna. Aenean nec hendrerit justo, sed fringilla arcu. Duis porta iaculis gravida. Proin vitae finibus odio, a tempus tortor. In sed nisl aliquet, rutrum quam quis, interdum libero. Morbi rhoncus congue augue, sed elementum enim condimentum eu.

Morbi leo libero, pellentesque iaculis bibendum nec, placerat et turpis. Maecenas commodo id libero et semper. Cras mauris dolor, sagittis in nisi quis, rhoncus vestibulum purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas volutpat leo vel faucibus feugiat. Nunc fringilla ex semper, sagittis nisl ac, ullamcorper orci. Aliquam luctus elementum ornare. Maecenas scelerisque dolor nibh, eget dignissim risus pellentesque in. Nulla vel lorem viverra, ullamcorper elit eu, lobortis massa. Cras neque risus, efficitur in justo in, congue ultrices tortor. Duis nisl libero, semper nec porta et, fringilla sed metus. Donec ut erat urna. Duis eu tristique lectus. Nunc condimentum non nunc ac maximus. Interdum et malesuada fames ac ante ipsum primis in faucibus.

Etiam mollis consectetur maximus. In euismod lectus a molestie ullamcorper. Fusce ornare nibh vel leo lobortis cursus. Ut ligula erat, finibus sed tincidunt in, aliquet maximus augue. Duis eu nisi dui. Mauris leo ante, aliquam vel sapien ac, vestibulum vestibulum lectus. Integer sed luctus sem, vel molestie lacus. Praesent gravida ante et odio vulputate aliquam. Nulla id ultrices felis, sit amet elementum purus. Nulla elementum semper tortor. Sed non mauris a risus placerat placerat. Nullam ante turpis, consectetur viverra lectus vel, pretium aliquet diam. Vivamus a imperdiet velit, rutrum bibendum mi. Proin at mauris lacus. Aliquam posuere a massa et suscipit. Quisque facilisis blandit tellus, nec tristique mauris bibendum vitae.

Proin laoreet efficitur ipsum, ut iaculis justo. Pellentesque sed turpis risus. Quisque pellentesque ex quis sapien iaculis condimentum. In vitae arcu nec purus egestas porta. Curabitur molestie metus sem, vitae volutpat arcu gravida nec. Morbi porta varius velit, eget blandit magna dapibus et. Nam vulputate, mi vel dignissim vestibulum, ante mi posuere tortor, sed sodales mi quam in metus. Maecenas vel imperdiet dolor.

Nulla malesuada leo eget porttitor porttitor. Ut ut nisi eget nisl porttitor congue et in tellus. Nam at mi eget risus hendrerit aliquet. Nulla scelerisque dictum erat, non auctor leo consectetur ac. Nullam nunc nisi, mattis sed felis vitae, fringilla molestie nisi. Curabitur tristique augue et urna tempus, eu eleifend augue porttitor. Fusce sed pellentesque lectus. Vivamus non mauris id libero eleifend sodales at non arcu. Mauris eleifend aliquet purus, in consectetur risus sodales et. Aenean sed scelerisque ex. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam pulvinar elementum mollis. Cras bibendum augue et faucibus blandit.

Donec at eros vel lacus vulputate lobortis sit amet consequat ex. Sed convallis nibh sollicitudin arcu suscipit, vel facilisis purus bibendum. Duis molestie, nulla nec sagittis scelerisque, est leo dignissim nunc, id rhoncus massa orci ac enim. Pellentesque maximus lacus a ex pretium, non molestie lorem pharetra. Suspendisse faucibus mauris viverra orci maximus feugiat. Etiam efficitur magna fermentum turpis ultricies, vitae porta sapien volutpat. Vivamus vulputate consequat dignissim. Sed sit amet condimentum ante. Donec quis lectus blandit, sodales quam id, euismod diam. Praesent finibus nisl enim, non vestibulum leo vehicula non. Duis dapibus neque ac sem gravida, ac semper nibh consequat. Integer dignissim, tellus id vulputate ullamcorper, orci turpis luctus erat, id placerat enim nibh sed dolor. Nam dapibus dapibus orci, non facilisis nisl tristique ut. Vivamus sodales nisl eleifend nibh bibendum blandit. Vivamus a porttitor ex. Proin sed lacus lorem.

Ut in egestas nisi, sit amet venenatis libero. Aliquam tincidunt metus in vestibulum scelerisque. Morbi ut magna faucibus, consectetur sem eu, cursus felis. Donec ac volutpat ex. Donec non facilisis tortor, in malesuada quam. Quisque in augue et nunc euismod fermentum nec accumsan dui. Quisque ac sagittis odio. Integer cursus, lectus vel aliquam hendrerit, eros mi vulputate eros, sed scelerisque ipsum ante in lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque tristique venenatis vehicula. Nullam efficitur diam gravida mollis fermentum. Proin dapibus, augue eget rhoncus sodales, ex velit fringilla tortor, eget maximus neque urna at augue. In quis egestas neque. Fusce non sapien in urna fringilla bibendum.

Cras vitae arcu eget lectus interdum lacinia. Aliquam erat volutpat. Cras ac lorem vel lectus convallis efficitur. Aliquam erat volutpat. Pellentesque ullamcorper ipsum at nibh pulvinar faucibus. Praesent nunc lorem, elementum sit amet feugiat vel, vestibulum vel mauris. Nunc vestibulum odio vel urna sagittis, id placerat lorem consequat. Nam vehicula, velit vel interdum scelerisque, sem ipsum pretium nulla, sit amet vestibulum risus massa vitae tortor. Nam finibus, purus a pretium lobortis, elit elit molestie enim, sit amet convallis odio nisi sed mauris. Fusce interdum nisl eu quam imperdiet feugiat.

Vivamus imperdiet venenatis nulla eget feugiat. Morbi faucibus eros eget condimentum vestibulum. Sed massa mi, commodo maximus orci ac, vulputate placerat massa. Nullam id pretium ligula. Curabitur eleifend velit vitae odio tincidunt sodales. Duis sed nisl et lacus hendrerit tempor. Integer id purus id turpis posuere volutpat. Aenean et risus laoreet, tincidunt ex sit amet, vestibulum nulla. Vestibulum a vulputate nibh, sed faucibus orci. Cras tempor, est id convallis scelerisque, sem ipsum porttitor tellus, accumsan consequat sapien tortor vitae nisi.

Pellentesque ullamcorper gravida tincidunt. Morbi vel lacus eget ante rutrum vestibulum id et diam. Maecenas eget scelerisque nibh. Phasellus malesuada convallis accumsan. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis venenatis mattis magna ut vulputate. Praesent accumsan posuere luctus. Duis arcu sem, luctus eget tempor quis, molestie et lacus. Etiam vulputate leo ullamcorper ante tincidunt congue. Nullam dui risus, lacinia id tincidunt sed, finibus quis velit. Proin suscipit quam et arcu iaculis placerat. Sed feugiat faucibus scelerisque. Aliquam porta in lorem eget consequat.

Fusce sit amet enim et justo tempor euismod. Donec eu dignissim nisi, interdum mollis dolor. Vivamus rhoncus feugiat cursus. Nullam quis iaculis massa, ut dignissim nisl. Suspendisse pulvinar, dui quis finibus ultrices, urna tellus faucibus purus, eu ultrices metus tellus sed leo. Proin risus odio, suscipit eu enim in, faucibus commodo dolor. Duis scelerisque nibh faucibus, malesuada nunc et, feugiat enim. Donec in nisi orci. Nulla placerat eu tellus sit amet hendrerit. Aliquam auctor ultricies augue, ac feugiat ipsum convallis vel.

Ut rutrum et velit vitae congue. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vehicula euismod ex ut tincidunt. Aliquam erat volutpat. Aliquam nec consectetur ligula. Nam porta tempus tincidunt. Maecenas porttitor arcu ac sem condimentum fringilla. Sed tortor dui, imperdiet in dui vel, varius convallis nulla. Vestibulum condimentum, urna sed varius venenatis, erat sem gravida tortor, sollicitudin lacinia lorem sapien non velit. Sed accumsan id tellus in varius. Donec vulputate ligula lacinia sagittis porta.

Etiam luctus orci sit amet nibh dictum blandit. Donec at nisi risus. In sit amet faucibus nisl. Nunc nec iaculis elit. Cras vitae condimentum sapien, sit amet lacinia ipsum. Sed porttitor, dui et hendrerit convallis, magna lorem tempus lorem, vitae luctus justo urna a lectus. Nullam tincidunt semper vestibulum. Pellentesque molestie eleifend posuere. Mauris euismod vitae lacus eget cursus.

Aliquam ante elit, facilisis ut nunc id, imperdiet sodales odio. Phasellus pretium eros a mauris porta cursus. Integer luctus faucibus magna, vel imperdiet sapien scelerisque ut. Curabitur molestie augue non tincidunt maximus. Donec volutpat porttitor diam, vitae tempor risus. Aenean quis fringilla sem. Quisque vitae dapibus velit, sed maximus quam. Nam condimentum tellus in nibh consectetur luctus. Maecenas maximus eget mi eget pulvinar. Etiam ultrices blandit sem, id dictum odio dictum sed. In nisl arcu, dictum nec nulla vitae, lobortis laoreet arcu. Praesent tincidunt vehicula tristique. In hac habitasse platea dictumst. Phasellus volutpat a nisl nec rhoncus.

Maecenas eget sagittis quam. Ut quis eros semper odio iaculis sodales non et lacus. Donec ut pulvinar neque, non interdum ex. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec vitae tincidunt sem. Praesent et ultricies erat. In et ante et felis aliquam efficitur. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.

Morbi ut odio vel lacus elementum accumsan. Vestibulum auctor metus non massa auctor luctus. Praesent ut dui sed ipsum consequat consequat. Vestibulum lacinia magna nisl, a eleifend urna commodo nec. Sed libero felis, cursus non lobortis in, ullamcorper volutpat erat. Donec interdum suscipit libero vel egestas. Etiam et pellentesque nisi. Fusce vitae velit at lectus egestas consectetur nec sit amet nibh. Fusce sit amet sem sed ipsum dictum ultricies. Vivamus pharetra felis leo, a dictum felis feugiat a. In molestie erat lacus, vel commodo sem aliquet nec. Pellentesque pellentesque condimentum nisi auctor varius. Donec rutrum urna quis pretium consectetur. Nam commodo nec dui in tristique. Cras eros ipsum, fermentum quis venenatis luctus, accumsan in nulla.

Ut gravida condimentum interdum. Ut lacinia vehicula mauris, sit amet maximus sem eleifend pellentesque. Praesent egestas malesuada enim. Etiam ornare arcu arcu, sed semper neque fringilla vel. Aenean at felis eros. Duis magna quam, interdum eget tortor quis, vestibulum vulputate orci. Ut dui est, ultrices id mi et, dapibus vestibulum justo. Donec semper venenatis pellentesque. Sed cursus ex ut magna pharetra, scelerisque suscipit felis bibendum. Suspendisse potenti. In eget odio eget enim vestibulum blandit mollis vel velit. In at justo eget odio pulvinar hendrerit ut lobortis felis. Aliquam erat volutpat. Nullam quis nisi luctus, feugiat erat ut, dapibus felis.

Integer ultricies arcu ut mi consectetur, eget condimentum dolor ultrices. Praesent tincidunt vitae diam sodales fermentum. Nullam mi lorem, auctor vitae neque vel, aliquam cursus mi. Nam lacus ex, iaculis ut nulla a, scelerisque rhoncus leo. Vivamus maximus efficitur feugiat. Quisque non mi risus. Suspendisse vel purus eleifend, lacinia tortor eu, dictum orci. In vitae lorem placerat, pulvinar lorem ut, sagittis ipsum. Ut pulvinar hendrerit tellus eu tincidunt. Nam ligula ipsum, aliquet a lobortis nec, porta et velit. Curabitur eu dignissim eros, vel efficitur tortor.

Suspendisse sed dui ac lacus feugiat faucibus in vitae sem. Sed nec dictum mi, id ornare dolor. Nullam lobortis, ipsum vel ultricies fermentum, eros neque dictum est, eget fermentum sapien dolor eget leo. Nulla lectus felis, viverra sed facilisis a, luctus ac erat. Aenean luctus ac mauris at maximus. Nunc lacinia porta orci at rhoncus. Suspendisse ut vestibulum augue, at convallis nunc. Maecenas at urna sodales, tincidunt lectus ut, congue leo. Curabitur vestibulum facilisis convallis. Vivamus dictum elementum magna et auctor. Proin maximus sapien nisl, vel scelerisque tortor tempor ac. Aliquam dignissim varius placerat. Praesent pellentesque velit metus, at commodo orci accumsan at. Aliquam venenatis ipsum arcu, non molestie mi cursus non.

Cras aliquam lacus a felis tincidunt, scelerisque lobortis orci sollicitudin. Sed fringilla nibh vitae lacus malesuada, sit amet gravida libero elementum. Cras id ex purus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Phasellus non maximus est, quis auctor ante. Duis vitae purus libero. Phasellus ante ex, suscipit id metus id, rutrum volutpat orci. Nulla semper risus enim, eu consequat elit venenatis ac. Praesent sit amet placerat sem, eu sagittis odio. Phasellus eu lectus vestibulum eros pellentesque ullamcorper. Maecenas ultrices tempus rutrum. Suspendisse a rutrum massa. Aenean diam urna, consequat in semper nec, euismod non sem. Cras suscipit sem porttitor lectus efficitur, at efficitur leo lacinia. Nullam in sagittis tellus, et viverra urna. Vestibulum ut lacus id dui ornare vehicula nec in est.

Duis libero ligula, sagittis ut metus accumsan, congue vehicula erat. Aliquam erat volutpat. Quisque feugiat eros a tortor mattis vestibulum. Nam ullamcorper erat eu maximus sagittis. Phasellus mollis rhoncus sem, nec egestas augue suscipit et. Vivamus ut dui nunc. Aenean eu lectus ac urna vehicula maximus eu vitae lacus. Phasellus et ipsum eget ligula auctor gravida. Praesent felis libero, tristique eget odio ac, iaculis tincidunt est. Vivamus tristique iaculis turpis, suscipit ultricies felis lobortis a. Vivamus accumsan in eros condimentum varius.

Nam ut orci ut purus varius efficitur at id arcu. Maecenas gravida ipsum at purus varius fringilla. Sed quis mauris eget orci bibendum mattis. Maecenas eget semper augue, nec blandit quam. Nunc aliquam egestas tempor. Maecenas ligula orci, pulvinar sit amet felis ac, convallis porta ex. Nulla semper iaculis venenatis. Vivamus sed turpis nec diam elementum viverra quis sed erat. Praesent maximus ipsum sit amet tempus dapibus. In a tincidunt nisi. In id diam dui. In hac habitasse platea dictumst. Cras ac blandit enim. Donec volutpat placerat dapibus. Pellentesque vel vestibulum mauris.

Duis id tristique tellus. Nunc sagittis leo justo, nec luctus ex malesuada sed. Curabitur bibendum posuere magna, eu finibus leo efficitur at. Nam consequat bibendum urna et laoreet. Aliquam quis dictum felis. Integer a enim ullamcorper, aliquet turpis sed, feugiat tellus. Duis vitae erat bibendum, mattis felis sit amet, blandit lacus. Integer dictum, metus non tincidunt condimentum, tellus neque semper felis, eget tristique ante tellus eget elit. Cras facilisis pretium erat eget euismod. Aliquam et egestas nunc. Pellentesque ac tellus in diam sollicitudin ultricies. Suspendisse potenti. Donec at nisl at massa dignissim lacinia sit amet non massa. Cras vehicula blandit metus nec pharetra. Praesent vulputate fringilla nibh faucibus pharetra.

Suspendisse vel orci finibus leo pharetra porttitor. Donec lorem neque, tempus blandit leo eu, vulputate consequat ipsum. Proin pharetra sapien eget dolor accumsan, sodales tristique lectus iaculis. Sed in porta ligula. Quisque lacus libero, gravida rhoncus arcu ut, lobortis interdum nisl. Duis pulvinar nulla sit amet sem accumsan, vel venenatis nisi luctus. Etiam sit amet placerat quam, nec commodo dolor. Fusce urna urna, efficitur at scelerisque et, hendrerit id tellus. Praesent venenatis volutpat lacus non viverra. Ut congue feugiat rutrum.

Nullam id pretium arcu, vel commodo ex. Sed commodo, augue vel efficitur sollicitudin, tellus nibh tincidunt dolor, vitae gravida eros velit non quam. Ut in leo a nulla scelerisque cursus nec et erat. Donec sapien dolor, rutrum quis dignissim nec, consequat ac nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer congue lacus neque. Maecenas a libero ac nibh scelerisque fringilla.

Ut lacinia tincidunt magna, sit amet mattis libero semper quis. In vitae libero ac est commodo mattis quis quis lacus. Praesent vulputate est vel gravida maximus. Mauris massa erat, pharetra eget ornare nec, pharetra in nisl. Nullam tempus est nunc, et luctus purus accumsan ut. Maecenas sed feugiat justo. Integer nec congue neque. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In hac habitasse platea dictumst. Mauris neque justo, bibendum et accumsan semper, rhoncus ut mauris. Quisque a nibh gravida, pellentesque turpis ac, placerat ligula. Curabitur consectetur turpis ut ex rutrum condimentum.

Morbi a scelerisque ipsum. Proin nibh enim, iaculis eget justo sed, vestibulum fermentum dolor. Sed semper neque a sapien congue, gravida aliquet felis pulvinar. Praesent euismod mi nisi, at elementum elit ullamcorper ut. Curabitur consectetur elit pretium, interdum ipsum in, efficitur enim. Nam suscipit eros sit amet diam efficitur, nec accumsan elit tempor. Pellentesque vel neque eget leo volutpat mattis.

Praesent vitae arcu sed risus volutpat aliquet at id dui. Donec sed fringilla tortor. Vestibulum efficitur dolor eget mauris dapibus, et accumsan magna congue. Donec posuere magna urna, eget tincidunt erat cursus in. Cras sed sollicitudin arcu. Aliquam pellentesque malesuada purus, quis elementum est rhoncus eget. Proin placerat eget sapien sed consequat.

Cras venenatis, lectus eu euismod eleifend, tellus quam tempus lorem, sed hendrerit dolor justo sed dolor. Quisque posuere eros neque, sed dignissim erat fringilla vitae. Donec nunc arcu, suscipit eget erat vel, commodo porttitor turpis. Cras dui tortor, facilisis maximus venenatis quis, aliquet nec mi. Mauris vel sagittis quam. Etiam vel quam sed massa congue iaculis ultrices a erat. Morbi sit amet fermentum est. Pellentesque at blandit turpis, ut elementum erat. Praesent pellentesque ac risus nec semper. Donec porta enim eget ultrices viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Nunc ligula diam, ultrices ut convallis ultricies, eleifend non tellus. Quisque aliquet magna et arcu blandit pharetra. Nulla pharetra nibh congue arcu sollicitudin porta. Aliquam erat volutpat. Nunc sodales aliquet nibh, a gravida lectus tincidunt et. Vivamus egestas, erat ut faucibus eleifend, diam tellus fringilla sapien, ut aliquam magna justo at odio. Nam dignissim ante sit amet lectus luctus, id vulputate nulla fermentum. Nunc ac orci mattis, lobortis enim ut, elementum lacus. Cras porta lacus vel justo hendrerit, id dictum quam rhoncus. Duis tincidunt augue ut placerat efficitur. Sed eget tortor ut ligula ultrices fringilla.

Aliquam purus ipsum, pellentesque sed erat sed, blandit pharetra leo. Pellentesque scelerisque velit eu ante aliquet, eget ultricies diam finibus. Nulla fringilla ante sit amet urna varius, et ultrices urna volutpat. Sed placerat ipsum arcu, at consequat arcu pretium interdum. Donec vel justo odio. Fusce sagittis turpis quam, vitae viverra quam luctus ut. Duis consectetur tortor laoreet libero aliquet varius.

Donec pharetra lorem in lacus tristique, suscipit lobortis eros finibus. Nulla justo diam, facilisis id turpis pretium, consequat dapibus urna. Praesent nec augue eget odio pulvinar pulvinar. Mauris ultricies sapien dapibus odio facilisis, sed aliquet nisi pellentesque. Cras iaculis sem et gravida venenatis. Morbi sapien odio, luctus at metus in, rutrum tristique felis. Nulla et turpis ultrices, laoreet odio non, volutpat est. Nam at nisi sit amet orci laoreet imperdiet.

Vivamus cursus lobortis nisl, a vestibulum est rutrum fringilla. Maecenas malesuada tristique urna id mattis. Suspendisse scelerisque libero eget est maximus vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nulla et ornare urna. Donec placerat in libero ut rutrum. Nullam non dictum felis. Suspendisse sagittis dictum lectus ac tincidunt. Vestibulum commodo mi vitae lacus euismod consequat. Morbi ut dapibus lacus. Nullam arcu dui, laoreet tempor viverra at, ornare ac mauris. Quisque consectetur interdum odio, efficitur viverra magna.

Maecenas urna sem, dapibus a nulla nec, porta posuere augue. Nullam id risus vitae risus pretium mollis. Ut vulputate mi mi, nec volutpat mauris euismod sed. Nulla ac turpis at purus scelerisque facilisis. Aliquam vel viverra ante. Fusce a lacus quis enim ultrices pharetra tincidunt vel nisl. Donec ac viverra eros, sed viverra odio. Vestibulum consectetur finibus mauris tempor posuere. Donec interdum venenatis eleifend. Sed mi tellus, pulvinar non iaculis a, rhoncus id risus. Aenean aliquam, turpis non sodales tincidunt, est felis placerat sem, vitae vehicula metus felis non risus. Mauris lacus odio, dignissim vitae metus eu, condimentum mattis est. Nulla pulvinar, leo a ultricies rutrum, nunc ex porta metus, eget condimentum justo turpis in est. Maecenas eu faucibus justo, id tincidunt odio.

Praesent dictum vehicula auctor. Quisque efficitur nec lacus eget pretium. Nullam id pulvinar ante. Duis ornare velit gravida aliquam accumsan. Aenean suscipit sagittis justo, non tincidunt sem. Integer vulputate augue quis sapien mattis, et commodo dolor pellentesque. Aliquam ac semper arcu. Aliquam venenatis, odio ac eleifend gravida, ante neque elementum sem, et pellentesque dui dui quis purus. Integer dictum lacinia molestie. Curabitur sed consectetur lacus. Nam in tempus nunc. Aliquam sem tellus, luctus non mauris in, vestibulum dapibus lectus.

Aenean pulvinar vel est quis pulvinar. Sed vitae sollicitudin libero. Vivamus varius mi quis mi fringilla, vel volutpat nisi commodo. Quisque a dignissim urna. Integer ultricies suscipit dolor, nec vestibulum orci. Aenean ac tincidunt ipsum. Nulla pharetra fringilla imperdiet. Morbi scelerisque, tortor vel condimentum dictum, magna turpis viverra tortor, a fringilla libero nulla et tortor. Sed diam tortor, consequat non auctor id, aliquet sed tortor.

Nam maximus sodales lacinia. Cras magna elit, eleifend quis pretium ut, auctor non mauris. Suspendisse dolor nulla, cursus sit amet semper ut, consequat efficitur neque. Proin tristique lorem mauris, et bibendum erat molestie id. Pellentesque bibendum, nisl quis bibendum tincidunt, leo leo pulvinar ligula, sit amet dignissim arcu turpis non sem. Cras vitae metus vitae est iaculis aliquet at eget metus. Morbi faucibus ligula tellus, ut semper diam tempus porttitor. Pellentesque fringilla risus a hendrerit maximus. Praesent ac augue id odio aliquam maximus. Morbi non orci risus. Etiam ante ipsum, facilisis vel nisi id, luctus pulvinar dui. Nunc ultrices nibh ut odio laoreet sagittis. Integer commodo commodo ligula, non volutpat ex elementum sed. Quisque id eros nunc.

In sed elit suscipit turpis facilisis suscipit non ac quam. Pellentesque tincidunt egestas rhoncus. Phasellus tempor ipsum et turpis mattis tempor. Proin in maximus nulla, nec pretium est. Vivamus nec augue eget quam dapibus venenatis in non lorem. Sed et lobortis ex. Vivamus tristique nibh a tellus molestie, laoreet accumsan lorem rutrum. Pellentesque blandit lobortis malesuada. Duis et risus in nibh ultricies sagittis. Etiam euismod sem quis ante tempor, a tincidunt enim pharetra. Mauris condimentum elementum ipsum quis vehicula. Sed id orci laoreet, hendrerit lacus vel, pellentesque libero. Proin in efficitur neque.

Aliquam rutrum vitae leo a egestas. Phasellus id nibh vel enim interdum facilisis. Pellentesque dictum turpis lorem, nec volutpat quam tincidunt vitae. Morbi magna nulla, tempor non nulla quis, tempus feugiat ligula. Proin ac lobortis neque. Aliquam cursus maximus dolor iaculis rutrum. Curabitur sed diam non lectus sollicitudin fringilla. Suspendisse nec nibh at justo pulvinar malesuada.

Duis hendrerit nec sapien non sagittis. Duis tincidunt libero nec quam congue, sed pulvinar augue condimentum. Integer magna ante, bibendum et metus id, scelerisque laoreet massa. Suspendisse potenti. Aenean maximus libero sit amet egestas placerat. Etiam vel ante vitae eros mollis ornare. Nam non mauris vestibulum, euismod ligula ac, scelerisque eros.

Nulla felis mauris, auctor a lacinia ac, lacinia in magna. Maecenas rhoncus nulla sapien, venenatis facilisis neque aliquet ut. Nam venenatis purus facilisis ultricies condimentum. In eleifend nisi at neque iaculis egestas. Donec luctus iaculis condimentum. Phasellus sodales aliquet elementum. Fusce sed turpis ligula. Vivamus egestas auctor felis in vulputate. Nunc viverra quam nec mauris auctor, vitae cursus turpis pellentesque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis lectus magna, gravida sed blandit dapibus, sollicitudin vel leo. Donec facilisis tempor nisi, condimentum vulputate mauris eleifend ac. Quisque rhoncus eleifend quam, et auctor nisl vulputate lacinia. Quisque semper est lectus, quis aliquam dui consectetur a. Nulla sit amet purus nunc.

Curabitur erat mauris, tincidunt ut eros id, dignissim pulvinar orci. In quis dui et lorem bibendum eleifend non at purus. In convallis massa aliquet tellus tristique semper. Nulla quis enim luctus, laoreet erat sit amet, auctor velit. Curabitur quis metus non lectus molestie scelerisque. Fusce eget tristique lorem, feugiat tristique ex. Nulla eget lectus vel enim eleifend euismod. Pellentesque sit amet augue massa. Integer a fermentum libero. In purus tellus, volutpat non malesuada nec, ultricies laoreet quam. Donec eget dictum tellus.

Fusce imperdiet commodo erat, eget malesuada magna bibendum sollicitudin. Sed et pretium est, ut hendrerit nulla. Fusce scelerisque semper nisl. Maecenas orci ligula, tincidunt efficitur tortor id, bibendum bibendum purus. Sed quis felis pellentesque, vestibulum mi sed, dapibus arcu. Pellentesque metus eros, pharetra in tincidunt at, volutpat nec urna. Suspendisse sed nisi pharetra, mattis diam et, pulvinar nibh. Nunc convallis id urna eu molestie. Duis faucibus turpis in rutrum pulvinar. Maecenas cursus, enim vel imperdiet condimentum, ex nisl lacinia neque, vel interdum sapien ligula non dolor. Curabitur id orci molestie, condimentum velit quis, consequat neque. Suspendisse nunc risus, varius sit amet nunc non, tempor feugiat justo. In in urna et elit suscipit placerat.

Sed luctus, leo et aliquet malesuada, elit tortor finibus dolor, ac eleifend augue odio eu justo. Donec non dolor in quam finibus tristique eget at lorem. Duis interdum eget lorem ut accumsan. Duis sapien odio, posuere eu velit ac, lobortis consequat arcu. Quisque molestie, odio non aliquet vestibulum, enim lorem vehicula ante, et euismod ante metus ultrices lacus. Nunc sem ante, interdum in nisl sit amet, tempor aliquet velit. Suspendisse ut eleifend mauris. Maecenas laoreet odio magna, sed consectetur lectus mattis et. Morbi sed dapibus magna.

Interdum et malesuada fames ac ante ipsum primis in faucibus. In tempor mauris eget neque semper, at venenatis ante convallis. Nam at ipsum ligula. Cras sit amet lectus vitae justo molestie gravida vel eu lacus. Duis eros sem, cursus et felis vel, blandit faucibus nibh. Nam consectetur sapien at vehicula volutpat. Pellentesque ultricies lacus eu nunc scelerisque, non consequat mauris aliquam.

Ut malesuada, mauris ut aliquet cursus, est neque ornare ex, ut rhoncus mi odio eget ex. Fusce aliquam sodales felis eget feugiat. Phasellus sed odio ultrices, dignissim tortor in, fermentum nisi. Maecenas ut suscipit augue. Sed id euismod est. Vivamus ut ipsum lectus. Ut tempus, nunc vitae bibendum convallis, neque tortor varius augue, ac fringilla quam massa pulvinar enim. Aliquam pharetra tellus nisl, in gravida erat auctor quis.

Vivamus felis ex, mollis vel vestibulum et, viverra ut augue. Fusce nec convallis diam, sed pulvinar erat. Nulla lacinia odio sed sem blandit eleifend. Nullam sit amet congue lorem, sit amet aliquet felis. Aenean porttitor laoreet tempor. In non malesuada eros. Donec quis dui a augue aliquam viverra at commodo augue.

Proin non eros sit amet leo pretium venenatis. Vivamus elit tellus, lacinia at laoreet at, mattis a metus. Fusce libero sem, aliquet eu urna iaculis, porta gravida odio. Maecenas tincidunt enim id massa eleifend pharetra. Fusce sagittis enim nulla, in ornare neque euismod id. Sed nisi erat, mattis a ante ut, accumsan porttitor purus. Praesent eu orci vel magna laoreet ultrices quis non lectus. Donec pharetra dolor in interdum efficitur. In rutrum eros a massa egestas, at dapibus mi bibendum.

Mauris lobortis tempor nisi at varius. Vivamus a auctor urna. Vestibulum efficitur pulvinar augue, ac maximus leo aliquet vel. Maecenas ac massa non justo iaculis blandit ac sed mi. Maecenas viverra, risus in iaculis vulputate, metus erat mollis purus, sed scelerisque augue velit ac tellus. Donec mattis est non nunc bibendum, eget feugiat turpis faucibus. Vestibulum non turpis justo. In id quam ligula. Nulla eget vestibulum neque. Cras id mollis nunc. Praesent feugiat tempor arcu, facilisis mollis est interdum vitae. Pellentesque venenatis felis quis congue volutpat.

Curabitur tempus commodo ante sit amet sollicitudin. Donec nec efficitur ligula, in malesuada elit. Duis cursus sem nec mauris rhoncus, et convallis nunc tristique. Etiam vitae venenatis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut venenatis ullamcorper laoreet. Aenean arcu nibh, placerat vestibulum maximus sit amet, euismod ut urna. Integer vulputate, nisl ac vulputate vestibulum, purus nisi laoreet lacus, tempus rhoncus purus quam eu turpis. Nulla nec imperdiet justo. Vivamus tempus leo sit amet massa lacinia molestie. Ut sollicitudin justo in tempor pellentesque. Nam in lectus vel elit cursus euismod. Sed congue tincidunt dui, a venenatis tellus pretium id. Phasellus orci massa, auctor eu leo ac, fringilla aliquet purus.

Aenean tincidunt augue non posuere eleifend. Cras vel massa at metus gravida varius quis viverra libero. Duis egestas efficitur justo nec fringilla. Proin ac lacus pellentesque, gravida lectus ut, feugiat ante. Cras neque augue, imperdiet eu nisl et, tempus imperdiet orci. Sed mauris purus, venenatis suscipit aliquet vel, dapibus at velit. Fusce molestie id mauris ut mattis. Nullam at ipsum ac lectus condimentum ultricies. Donec vitae pharetra nibh. Sed fringilla nisi vel luctus sodales.

Nullam faucibus a augue quis tincidunt. Phasellus scelerisque, arcu ac sodales pretium, ligula ligula ultrices mi, vulputate condimentum erat turpis vitae ante. Phasellus ipsum tortor, varius vel risus sit amet, consectetur feugiat libero. Proin quis purus neque. Phasellus varius ipsum id commodo lobortis. Pellentesque a posuere tellus, non aliquam lorem. Curabitur pharetra odio purus, in gravida quam imperdiet in. Aliquam ullamcorper neque in nunc interdum porta. Nullam sapien enim, venenatis in ultrices nec, interdum vel ipsum. Suspendisse vel ornare leo. Morbi lacinia elit at lectus placerat, rhoncus efficitur tortor dapibus. Vivamus scelerisque dapibus ligula, et facilisis nisi cursus at. Duis cursus blandit magna, non ultrices urna iaculis non.

Cras egestas faucibus ligula quis eleifend. Nulla semper felis in orci ornare bibendum. Nulla eu lectus vitae purus pulvinar venenatis id in velit. Phasellus luctus tincidunt est, sit amet mollis dui semper vitae. Nam libero metus, varius vitae libero quis, porttitor convallis arcu. Nulla vitae aliquam justo. Vestibulum ut est eu augue egestas volutpat a nec arcu. Vivamus non risus id turpis pretium mollis sed a felis. Phasellus molestie pulvinar iaculis.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla facilisi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec scelerisque congue lorem vel mollis. Vestibulum ut lacinia ex, at vestibulum odio. Quisque bibendum imperdiet nisi, at gravida quam efficitur vitae. Nunc nibh enim, dapibus at augue a, eleifend suscipit sapien. Nullam a porttitor est, vitae imperdiet sapien. Sed viverra maximus venenatis. Vivamus eget commodo nulla. Cras nisi tellus, fringilla ac fermentum in, pretium vel nisi. Nullam eget commodo justo. Duis et hendrerit justo. Nulla sit amet ipsum at arcu aliquet vestibulum. Donec efficitur molestie maximus. Integer urna elit, vulputate sit amet blandit mattis, fermentum vitae risus.

Vestibulum tellus lectus, elementum a velit quis, finibus vehicula ex. Quisque ac volutpat purus, vitae dictum lectus. Proin maximus euismod libero, nec consequat risus eleifend vel. In urna eros, pharetra malesuada leo imperdiet, facilisis commodo purus. Mauris id dolor eget lectus sollicitudin lacinia. Fusce pharetra nunc erat, vitae accumsan lectus viverra eu. Ut mattis augue eu libero tempor, volutpat pulvinar eros semper. Morbi dapibus maximus ante vitae placerat. Proin rutrum purus et massa gravida mattis.

Aenean non tellus diam. Vestibulum non interdum tellus, et vehicula metus. Donec et dolor euismod, euismod eros nec, vestibulum eros. Donec a diam placerat, volutpat ex sit amet, sollicitudin urna. Suspendisse semper orci in egestas interdum. Nam luctus eros turpis, nec viverra magna viverra ac. Pellentesque ornare augue a enim eleifend hendrerit tempor in odio. Nunc semper aliquet libero ut cursus. Praesent at convallis ante. Nunc pharetra ex vitae tellus ultrices, et blandit enim consectetur. Sed eu enim nulla. Cras rutrum nulla id magna dapibus varius. Nullam convallis pretium semper. Vivamus porta arcu velit, vitae molestie orci vehicula quis.

Integer vel massa neque. Phasellus maximus nulla a sem tristique commodo. Quisque convallis tincidunt nunc. Sed lorem lacus, facilisis et ligula nec, fringilla vestibulum leo. Etiam dictum aliquam mi quis pharetra. Fusce luctus, felis eget cursus facilisis, dolor dui pretium ligula, eu tempor justo sapien vitae risus. Quisque tortor orci, faucibus bibendum ultricies non, vulputate eu diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In non risus facilisis, sagittis mi a, vehicula est. Nam odio lectus, pharetra sed libero eu, fringilla imperdiet ipsum. Sed pharetra consectetur erat, sit amet elementum libero pretium in. Vestibulum ut lorem eget lorem tincidunt interdum ut eget enim. Nullam euismod cursus ligula.

Nulla suscipit nibh mauris, nec cursus nunc vestibulum in. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam rutrum magna sit amet bibendum auctor. Phasellus venenatis, nulla efficitur egestas luctus, tortor risus facilisis enim, in tincidunt tortor ante quis odio. Nullam ultricies diam sit amet ornare molestie. Nulla gravida sem ipsum, ac fermentum mi pulvinar ut. Fusce consequat finibus faucibus. Nunc a tincidunt leo. In hac habitasse platea dictumst. Nunc molestie commodo malesuada. Fusce sit amet felis tincidunt, hendrerit eros non, sodales est. Morbi facilisis est auctor diam convallis dictum.

Praesent sagittis mauris nibh, sed placerat dolor molestie at. Morbi commodo ligula et sem vulputate, eu sodales lorem vestibulum. Cras tincidunt ante sit amet ipsum pretium cursus vel ac augue. Phasellus risus augue, egestas vitae porta eu, pellentesque ut nibh. Maecenas fermentum enim id lorem sodales facilisis. Mauris suscipit urna id augue vulputate auctor. Vestibulum at blandit tortor. Curabitur non justo tellus. Curabitur mattis nibh non bibendum porttitor. Vivamus scelerisque sagittis neque, eu fermentum libero accumsan at. Donec nibh dui, varius non vehicula congue, fringilla vel sapien. Donec bibendum egestas libero, vel tristique mi posuere vel. Praesent pretium ex diam, sed tincidunt urna interdum a. Cras finibus volutpat nisl nec feugiat.

Praesent efficitur ac magna eget porttitor. Quisque elementum arcu et ante luctus, ut ultrices tellus blandit. Sed enim dui, viverra gravida metus pellentesque, rutrum pellentesque quam. Praesent maximus ligula sed iaculis rutrum. Aenean feugiat nibh id metus placerat, eu rutrum ante aliquam. Fusce tempor ipsum ex, nec vehicula mauris eleifend id. Aliquam consectetur sem urna, at dapibus erat facilisis eget.

Mauris in nisi ut sapien rutrum sollicitudin quis a massa. Nam blandit ac nunc et semper. Aliquam efficitur magna eu risus sodales consequat. Nam laoreet dapibus leo tempor maximus. Curabitur vestibulum quam vel enim dapibus, eu tempor ligula feugiat. Cras maximus arcu mollis, porttitor purus vel, elementum diam. Vivamus at odio sit amet quam tempor convallis. Suspendisse in nisl congue, facilisis risus ac, ornare turpis. Integer eleifend quam in odio scelerisque auctor.

Aliquam erat volutpat. Aliquam ullamcorper augue id enim facilisis, in aliquam magna dictum. Curabitur diam neque, hendrerit ac ex quis, vestibulum blandit tortor. Proin faucibus arcu quis tincidunt egestas. Aliquam tristique dignissim posuere. Morbi metus ante, viverra eu leo nec, cursus feugiat lacus. Praesent posuere faucibus magna, eleifend dapibus diam bibendum tempor. Etiam pulvinar leo erat, ut tincidunt tellus cursus eget. Pellentesque auctor dolor urna, quis ornare arcu volutpat ut. Etiam rhoncus eu risus ut posuere. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam rutrum vel elit ac interdum. Nam maximus tincidunt tempor. In accumsan ex et sem placerat, ac egestas velit interdum.

Integer ultrices sed magna sit amet vestibulum. Curabitur ornare id purus et rhoncus. Mauris condimentum, est et convallis rhoncus, felis ex feugiat nunc, et egestas orci mauris non ante. Maecenas pretium eleifend risus sed congue. Proin dictum odio mauris, id posuere neque accumsan in. Aliquam vulputate ipsum at lorem tempor congue at a turpis. Nullam vestibulum, lorem at facilisis vehicula, dolor lorem scelerisque quam, id imperdiet turpis tortor at nunc. Quisque faucibus urna a blandit viverra. Nam tempus vestibulum egestas. In eget dui sagittis, sollicitudin ante at, consequat elit.

Fusce ut orci purus. Phasellus aliquam augue vel odio sagittis, vel efficitur arcu pharetra. Pellentesque felis eros, sodales id feugiat eu, lobortis in eros. Mauris est lorem, pretium sed nisl id, laoreet congue ipsum. Ut nec pretium neque, id aliquet ex. Nullam placerat quis felis non bibendum. In urna metus, condimentum eget ultrices id, consectetur ac lacus. Aliquam elit eros, accumsan quis facilisis vel, scelerisque sit amet purus. Curabitur vulputate justo a sodales pharetra. Curabitur sapien ligula, imperdiet rutrum tristique eget, hendrerit quis lacus. Duis ut enim sollicitudin, placerat eros quis, mollis lacus. Vestibulum sed urna at nibh ornare pharetra. Curabitur maximus magna ex, sit amet accumsan ex gravida vitae.

Donec convallis quam et velit molestie, vel lobortis lorem condimentum. Quisque neque libero, vehicula at lacus in, hendrerit accumsan velit. Nam nec nisl pharetra, ornare leo sed, aliquam arcu. Etiam nunc orci, fermentum sed nibh quis, lobortis volutpat nunc. Suspendisse lobortis dui non lacus hendrerit consectetur. Nunc feugiat commodo nunc in dictum. Vivamus cursus, nisl et dignissim pharetra, quam dui viverra purus, at sodales quam enim at eros. Praesent vel dapibus nisi, auctor dictum libero. Cras viverra purus orci, id condimentum nulla dapibus vel. In condimentum sit amet libero id viverra.

Mauris mattis orci lectus, vitae varius massa dapibus a. Maecenas leo est, consectetur ut faucibus vitae, aliquam vel felis. Curabitur et tortor sed augue varius congue. Maecenas sit amet imperdiet dolor. Quisque sed enim imperdiet, aliquam ligula at, mattis neque. Nunc luctus vestibulum nunc, sed pulvinar ante suscipit a. Sed ultricies laoreet velit in ultrices. Pellentesque hendrerit eget orci non auctor. Maecenas facilisis ullamcorper urna, ac gravida sapien varius sed. Nam feugiat ante ex, ac luctus tellus mattis vehicula. Donec enim neque, dictum vitae iaculis a, tempor nec dolor.

Maecenas congue nisi vitae viverra bibendum. Proin vulputate mi dolor, nec mattis nisl cursus ac. Nam dignissim turpis id purus dignissim pretium. Morbi a vehicula massa, ut fringilla enim. Pellentesque fringilla ullamcorper imperdiet. Vestibulum cursus eu sem ac varius. Proin varius fermentum tortor, in feugiat nulla facilisis eu. Proin volutpat, ex ut cursus dignissim, eros odio molestie lectus, elementum bibendum felis sapien eu diam. Quisque enim tortor, tempor non hendrerit eu, consectetur sit amet est. Nullam erat nisl, posuere eu ultricies eu, interdum bibendum ante. Ut dignissim posuere lectus vel feugiat. Praesent at interdum lorem. Phasellus venenatis nibh id libero dignissim maximus. Suspendisse at consequat tortor. Aenean eget magna dolor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Fusce bibendum libero ut facilisis dapibus. Donec in diam pretium, commodo dui sit amet, finibus urna. Phasellus dapibus vehicula magna at laoreet. Cras pharetra sapien at arcu condimentum tincidunt. Aenean erat nulla, ullamcorper in magna id, vulputate auctor nisl. Morbi interdum diam a orci dignissim congue. Donec at magna sit amet elit hendrerit sollicitudin. Morbi facilisis urna eget risus egestas vulputate sed at urna. Phasellus interdum aliquam elit vitae dictum. Etiam ultrices metus eget massa posuere, mollis lobortis leo condimentum. Vivamus pulvinar ut felis nec rhoncus. Integer sed cursus eros. Sed a cursus ex. Quisque vulputate, risus eu aliquet rutrum, enim massa mattis nulla, gravida lobortis ipsum felis sit amet felis. Pellentesque ornare vel justo a imperdiet.

Maecenas tempor nec ante eu scelerisque. Mauris suscipit vulputate ex, ut commodo ipsum ultricies ut. Vestibulum ut ligula eget lectus lobortis dictum in et magna. Integer gravida, purus id cursus vulputate, est leo convallis sapien, non tincidunt felis erat in urna. Donec lorem nunc, fermentum ut ante at, posuere tincidunt ante. Ut vulputate, eros sed volutpat lacinia, urna ex placerat arcu, facilisis elementum arcu augue at tellus. Donec vulputate varius magna, lobortis lobortis nulla suscipit dapibus. Nunc semper egestas finibus. Etiam molestie interdum ex ut convallis. Fusce dictum tortor sed libero interdum efficitur. Integer mi justo, luctus a porta ac, consequat vulputate justo. Praesent ac libero volutpat, porta libero in, pellentesque ante. Nulla cursus ipsum eget diam fermentum, finibus blandit dui egestas. Nam convallis lacinia felis, nec imperdiet est egestas ac. Nulla posuere aliquam augue, viverra tristique ante tincidunt id. Suspendisse et euismod lacus.

In id risus et elit mattis tempus volutpat quis risus. Nulla facilisi. Sed vel felis vitae magna dignissim iaculis. Fusce condimentum, nulla at egestas malesuada, odio justo tristique quam, consequat semper odio neque eget augue. Sed urna sapien, vulputate sit amet justo eu, semper viverra nulla. Vivamus vel iaculis ex. Duis eu urna congue, commodo nunc ut, facilisis ipsum. Cras dictum lobortis rutrum.

Ut eget dolor tempor, sodales ligula ac, convallis magna. Integer ultricies tristique dolor vitae porttitor. Suspendisse aliquet velit et ex placerat lobortis. Sed vitae mi a lectus vestibulum suscipit. Fusce fringilla pretium pulvinar. Integer in quam est. Aenean non ligula sed purus congue luctus ac quis magna. Suspendisse non semper arcu. Maecenas condimentum orci vel velit volutpat, condimentum viverra ligula venenatis. Proin sapien mauris, blandit vel nisi non, congue finibus felis. Proin ac massa lorem. Donec faucibus justo a ante molestie fringilla.

Quisque felis diam, maximus vel mi non, sodales fermentum orci. Nunc aliquet egestas lacus, id tincidunt eros laoreet non. Suspendisse fringilla eros eu tincidunt feugiat. Pellentesque pretium tortor in turpis auctor, eu volutpat turpis vestibulum. Nam id tellus euismod libero ornare rutrum ac nec augue. Cras sagittis sagittis est. Nullam risus est, laoreet id semper id, porta non magna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst. Curabitur mattis, justo et hendrerit sagittis, urna ante finibus tellus, id venenatis risus ipsum sit amet diam. Sed ipsum sem, cursus et ipsum nec, ornare tempor enim. Mauris sed sem consequat, consequat nunc vitae, eleifend nulla. Quisque vitae nulla mattis, gravida lacus eget, accumsan arcu. Curabitur at justo vitae risus ornare sollicitudin.

Curabitur gravida pretium sem sit amet tempor. Suspendisse sollicitudin felis vitae dui blandit, ac feugiat metus dictum. Vivamus posuere enim ut posuere tincidunt. Quisque ut ex ac nibh eleifend vehicula ut sed metus. Nullam eget iaculis lacus, vitae consectetur orci. Phasellus venenatis tellus id felis vestibulum venenatis non a dolor. Donec mollis lacus est. Vestibulum ut dui egestas, venenatis est nec, posuere quam.

Cras non dolor a sem sagittis sollicitudin. Proin maximus ullamcorper ante et dapibus. Aenean sollicitudin ut elit ut cursus. Nunc sed ultrices nunc. Nulla sagittis vel nunc non vulputate. Morbi malesuada eu est id luctus. Nam laoreet eleifend est, vel ornare elit interdum et. Maecenas dictum dui magna, eu malesuada erat ornare vitae.

Donec quis dui cursus, auctor metus at, interdum nisi. Sed convallis erat et euismod pellentesque. Quisque in urna et mauris ullamcorper iaculis. Pellentesque eget ex eget felis viverra rutrum. Sed tincidunt quis ante at ultrices. Quisque in venenatis ligula. Mauris sollicitudin condimentum nulla sed faucibus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. In hac habitasse platea dictumst. Quisque augue risus, ultrices id libero non, commodo pellentesque elit. Vestibulum auctor scelerisque suscipit. Praesent tristique nisl et rutrum ullamcorper. Vestibulum molestie ex hendrerit neque semper, sed interdum nisi convallis. Pellentesque ultrices nulla enim, ut vehicula purus eleifend quis.

Cras et ipsum id elit faucibus pretium. Duis consequat, felis ac auctor porta, diam elit tempor ex, nec mattis augue nibh eu nisl. Donec vitae est sit amet urna dictum venenatis vitae non mi. Morbi vitae nisi velit. Maecenas nibh enim, tincidunt quis sagittis et, fringilla sed magna. Nam eget augue nec justo placerat malesuada. Suspendisse dapibus, nisi et congue posuere, erat eros aliquam magna, eget congue nisl est eu ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Cras facilisis quis magna nec bibendum. Mauris eu sem eros. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac tincidunt sem, et accumsan ipsum. Mauris vel sagittis dolor. Cras quis congue nibh, vel interdum nibh. Etiam lobortis nisl quam, at semper risus blandit at.

Etiam condimentum velit purus, sit amet pulvinar tortor molestie at. Morbi tempor, libero auctor volutpat convallis, justo tortor finibus orci, non convallis ex quam non odio. Fusce hendrerit odio ac velit gravida, nec laoreet ex eleifend. In est lectus, ullamcorper in turpis a, molestie convallis metus. Maecenas vitae ante molestie nulla commodo rhoncus a sed quam. Aenean in enim vitae diam consectetur eleifend ut et dolor. Pellentesque gravida tellus non massa facilisis rutrum. Praesent hendrerit sollicitudin turpis, in efficitur tortor scelerisque at. Praesent condimentum, urna eu euismod varius, ipsum massa lacinia est, nec mattis ex diam ac velit.

Sed dignissim orci sed sapien pretium tempus. Nunc sagittis vel ipsum eu aliquam. Integer eget erat quam. Duis faucibus scelerisque dui sed aliquam. Aliquam finibus lacus sed pulvinar sollicitudin. Sed tincidunt eu tellus ac vulputate. Duis ac lectus non metus ullamcorper consequat sed eu tellus. Cras vulputate varius sem, vel maximus nibh consequat eget. Integer egestas, tortor eget luctus consequat, lectus neque iaculis diam, eu hendrerit nibh erat vitae lorem.

Aliquam elementum, est sed posuere placerat, ante augue fringilla odio, eu tempus tellus neque et est. Integer tempus nulla a tellus luctus, id tempus libero auctor. Nam semper dolor risus, eget vestibulum enim iaculis quis. Donec eleifend odio nunc, non rutrum nibh laoreet non. Suspendisse potenti. Proin ultrices auctor iaculis. Duis efficitur metus sed magna viverra, id facilisis sapien blandit. Donec at libero ultrices, dignissim sem aliquet, malesuada velit. In metus urna, vestibulum ac rhoncus ut, tristique malesuada mi.

Nulla venenatis, erat et fermentum sagittis, risus purus tincidunt odio, quis consectetur felis neque sit amet ligula. Vivamus imperdiet cursus egestas. Duis consectetur nulla vel pellentesque condimentum. In quis efficitur nunc, sit amet posuere metus. Vivamus vitae fringilla odio, id bibendum nisl. Donec fermentum pharetra orci, eu sodales erat elementum et. Aenean malesuada lectus nulla, ac ultricies diam imperdiet vel. Ut tristique sagittis felis, sed ultricies mi. Suspendisse viverra est a tellus lobortis efficitur. Morbi id sodales purus. Aliquam dictum justo at porttitor placerat. Vestibulum a gravida sem. In aliquam neque ligula, quis venenatis risus sodales at.

Nam iaculis lacinia vulputate. Mauris a tellus sollicitudin tellus pulvinar suscipit eu id enim. Fusce non elit consequat, efficitur dolor eu, pellentesque nisl. Aliquam lacinia eleifend tellus non accumsan. Nunc quis feugiat metus. Ut egestas quam et malesuada accumsan. Duis tellus ipsum, vulputate eu aliquet et, molestie eu nunc. Aenean quis lobortis ipsum. Aenean nec nibh quis sapien tincidunt blandit.

Curabitur et mattis erat. Morbi efficitur nunc in ultricies sodales. Nulla sit amet porttitor ex. Nam mollis ut sapien sodales pharetra. Vestibulum ipsum dolor, varius elementum ex vel, convallis tempus risus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent semper purus aliquam dolor eleifend, eu eleifend erat eleifend. Suspendisse nec sollicitudin nibh, vel elementum ligula. Sed laoreet varius massa sit amet semper. Sed mattis mi ornare malesuada vestibulum. Cras non eleifend nisi, vel facilisis purus. Ut nec sapien id magna ornare tristique a nec odio. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.

Cras tincidunt maximus leo a posuere. Nulla pharetra cursus sapien vitae bibendum. Aliquam sodales neque velit. Proin tincidunt justo in sagittis malesuada. Pellentesque vestibulum ante sollicitudin posuere suscipit. Fusce libero dolor, scelerisque eget cursus quis, malesuada ut risus. Mauris consectetur neque at dui mollis scelerisque. Suspendisse blandit, velit nec auctor mattis, elit nisi dignissim risus, vitae porttitor orci nisl in ante. Ut hendrerit erat augue, id lacinia felis suscipit non. Morbi condimentum eros varius, finibus ex at, elementum leo. Sed suscipit finibus tortor fringilla imperdiet. Morbi rhoncus vel metus consequat mollis. Nunc sed egestas velit, sit amet semper est. Morbi eu elit nec purus imperdiet malesuada. Integer ultricies condimentum odio vel condimentum.

Sed egestas ante vel arcu lacinia, vitae finibus odio aliquam. Duis eu ullamcorper mauris, fermentum egestas ante. Curabitur vel arcu tempor, placerat arcu a, aliquet neque. Fusce sit amet lacinia felis. Proin pellentesque nec leo vitae lacinia. Praesent a viverra elit. Fusce ut tempor sem, sit amet tincidunt lacus. Fusce tincidunt nulla velit, id bibendum dui dapibus vitae. Phasellus blandit tempus nisl non hendrerit.

Maecenas lobortis quam sed tortor vestibulum feugiat. Cras imperdiet nunc sit amet mollis ullamcorper. Quisque ut tempor mauris. Maecenas fermentum, tortor quis pulvinar malesuada, mauris sem eleifend lorem, in bibendum augue leo vel eros. Nunc faucibus mollis ante eget ornare. Duis imperdiet bibendum luctus. Fusce a feugiat lorem. Fusce rutrum vel lectus tristique vestibulum. Mauris interdum, justo id faucibus consectetur, augue leo scelerisque risus, quis tristique neque est et lorem.

Sed id neque maximus, pretium neque ut, tincidunt lorem. Nullam volutpat lorem at placerat vestibulum. Praesent orci orci, ornare non elit sit amet, sodales consequat metus. Curabitur sed porttitor odio, eget faucibus nisi. In volutpat est viverra maximus interdum. In hac habitasse platea dictumst. Vestibulum dapibus, erat pellentesque commodo efficitur, ligula mauris elementum risus, quis iaculis diam tellus in risus. Vestibulum vitae metus ut turpis aliquam ultrices. Sed ut neque erat. Nullam eu lorem dui. Aliquam in cursus justo, quis mollis enim. Nullam mattis eu elit at tincidunt. Vivamus id lobortis diam. Maecenas quis libero turpis. Maecenas lobortis urna at orci rhoncus vulputate.

Cras id sodales est. Nulla et augue pretium sem ornare rutrum. Vivamus ultrices odio non diam auctor dapibus. Nulla iaculis ante quis mi placerat, consequat commodo odio sodales. Integer vestibulum nibh sit amet ultrices luctus. Sed a interdum turpis, at varius lectus. Integer vitae dignissim lorem. Pellentesque nulla elit, facilisis id ultricies eu, porttitor at felis. Fusce blandit tempor ipsum, a semper neque elementum vel. Sed consequat velit at risus facilisis tristique. Nam tempus molestie urna a efficitur.

Quisque euismod dolor et nibh hendrerit, id facilisis ante volutpat. Pellentesque suscipit, libero quis consequat rhoncus, justo risus volutpat est, id accumsan odio risus id odio. Vivamus egestas volutpat erat, id consequat sem mattis vel. Nullam iaculis ante id quam faucibus feugiat. Aliquam erat volutpat. Quisque a porttitor risus. Maecenas tincidunt felis sed scelerisque imperdiet. Nulla volutpat ultricies sapien sit amet gravida. Quisque eu iaculis nunc, eget ultricies purus. Nulla ipsum elit, interdum nec lorem quis, tristique vulputate justo.

Integer nibh magna, mattis in consequat et, elementum quis dolor. Nam vitae lorem odio. Nullam maximus lobortis ante tempor laoreet. In luctus elit ac metus aliquet tempor. Nullam quis velit porttitor, dapibus dui eget, malesuada nisi. Mauris imperdiet euismod libero eget interdum. Pellentesque quis lobortis ante, sit amet sagittis velit. Vestibulum luctus ullamcorper leo.

Nullam pulvinar arcu vitae felis vestibulum, sit amet varius risus aliquam. Sed euismod nulla turpis, a hendrerit arcu sollicitudin sed. Nunc interdum mi justo, id laoreet mauris malesuada at. Praesent aliquam erat nec tempor volutpat. Vivamus bibendum ultrices sem, eget vestibulum mauris cursus pulvinar. In in nisl sed lorem facilisis pharetra. Nunc sit amet felis odio. Sed ultricies, erat sed sagittis feugiat, erat dui sodales turpis, sit amet vestibulum urna tellus a mi. Vivamus viverra congue aliquet. Integer ac velit tempor, commodo justo at, gravida tellus. Duis varius odio mi, non laoreet metus auctor in. Vivamus tellus eros, auctor at ante sed, placerat auctor dui. Nullam suscipit felis lectus, sed sollicitudin urna semper sed. Sed ac nisi dolor. Donec eleifend purus eget pharetra ultricies.

Proin auctor consequat ultrices. Nulla in sagittis urna. Duis venenatis porta vulputate. Nullam blandit accumsan dui, ac condimentum augue sodales a. Cras velit est, viverra sit amet lobortis ut, convallis et ex. Pellentesque augue sem, condimentum congue tortor fringilla, tincidunt vehicula metus. Phasellus pellentesque accumsan felis quis ullamcorper. Sed ac nunc nec nibh commodo porttitor nec non mauris. In arcu neque, auctor id maximus quis, suscipit vel neque. Maecenas commodo, eros vitae porttitor fermentum, ligula nisi blandit nisl, eu elementum enim lacus eget mi. Sed imperdiet euismod est, non pretium libero scelerisque ac. Pellentesque a lectus et turpis mollis imperdiet. Integer congue rutrum eleifend. Nulla bibendum nibh ligula, sed volutpat neque dapibus ac. Curabitur ac consectetur ante, et sagittis magna.

Aliquam rutrum risus arcu, in laoreet nulla mattis vitae. Nunc sit amet dui lectus. Fusce id ultricies augue, id ullamcorper neque. Nulla et quam tempus, pretium nibh in, congue enim. Suspendisse non orci nec lectus vulputate luctus quis in nunc. Curabitur porta nibh non diam interdum malesuada. Vestibulum eu mauris vel tortor vestibulum maximus id sit amet dui. Suspendisse ut tristique eros. Aenean in dictum lectus, vel tempor quam. Nullam a leo sodales, aliquet enim non, lobortis magna. Donec sed lectus convallis, feugiat nibh sed, faucibus elit.

Morbi mattis, eros elementum hendrerit porttitor, diam eros varius enim, eu blandit augue felis mattis mi. Cras finibus euismod nibh vel tempor. Nulla in erat velit. Duis eu risus in mauris sagittis semper quis ac lorem. Nunc ac dapibus metus. Nullam finibus sodales efficitur. Morbi vel lorem eget lorem tempor finibus. Aenean scelerisque bibendum sapien sed efficitur. Praesent egestas eros id neque sodales cursus. Vivamus vel risus vitae quam venenatis semper. In vel justo id dui venenatis pharetra ac sit amet lacus. Proin gravida ex vitae erat venenatis, in sollicitudin felis porta. Nullam ligula tellus, eleifend nec odio eu, dapibus tincidunt est. Aliquam interdum a ante non convallis.

Sed aliquet fringilla augue vitae semper. Ut vel enim tempus, malesuada urna a, sodales diam. Sed tincidunt varius massa. In hendrerit dapibus felis. In tincidunt magna non felis condimentum feugiat. Mauris euismod feugiat facilisis. Nunc nunc risus, aliquam sed mi id, scelerisque interdum quam. Aenean eu tellus sit amet leo egestas pellentesque nec eu eros. Quisque lacinia diam nec neque egestas semper. Duis sed tincidunt libero. Vivamus posuere in felis sed dapibus. Suspendisse volutpat lacus vitae lectus consectetur euismod. Phasellus ante quam, pretium quis magna ac, pharetra lacinia felis. Sed mattis elit aliquam sodales consequat. Vivamus eget enim auctor, volutpat sapien sit amet, tempus nulla. Quisque pulvinar sed tellus nec scelerisque.

Maecenas ac rhoncus risus. Phasellus pulvinar neque turpis, molestie sagittis ligula rhoncus eu. Proin tempor fermentum elementum. Vestibulum nec nunc justo. Suspendisse et quam maximus massa scelerisque pulvinar. Aliquam non massa vitae augue mattis congue eget euismod nisl. Maecenas eget mattis nisi. Etiam bibendum, tellus posuere vulputate auctor, mauris nisi malesuada risus, vel venenatis augue lacus quis orci massa nunc.`;
const FONT_FAMILY = "Ubuntu";
const FONT_SIZE = 40;
const initialMutableProps = {
  x: 0,
  y: 0,
  fontFamily: FONT_FAMILY,
  fontSize: FONT_SIZE,
  color: 255,
  debug: {
    sdfShaderDebug: false
  }
};
const Colors = {
  Black: 255,
  Red: 4278190335,
  Green: 16711935,
  Blue: 65535,
  Magenta: 4278255615,
  Gray: 2139062271,
  White: 4294967295
};
const colors = Object.values(Colors);
async function text({
  testName,
  renderer,
  testRoot
}) {
  const savedState = loadStorage(testName);
  let curMode = (savedState == null ? void 0 : savedState.curMode) || 0;
  let moveStep = (savedState == null ? void 0 : savedState.moveStep) || 1;
  let curColorIdx = (savedState == null ? void 0 : savedState.curColorIdx) || 0;
  const modes = [
    "canvas",
    "ssdf",
    "msdf",
    "canvas+ssdf",
    "canvas+msdf",
    "ssdf+msdf"
  ];
  const text2 = getLoremIpsum();
  const initialProps = {
    ...(savedState == null ? void 0 : savedState.mutableProps) || initialMutableProps,
    fontFamily: FONT_FAMILY,
    contain: "both",
    scrollable: true,
    width: renderer.settings.appWidth,
    height: renderer.settings.appHeight,
    text: text2
  };
  const msdfTextNode = renderer.createTextNode({
    ...initialProps,
    ...getFontProps("msdf"),
    zIndex: 1,
    parent: testRoot
  });
  const ssdfTextNode = renderer.createTextNode({
    ...initialProps,
    ...getFontProps("ssdf"),
    zIndex: 2,
    parent: testRoot
  });
  const canvasTextNode = renderer.createTextNode({
    ...initialProps,
    ...getFontProps("web"),
    zIndex: 3,
    parent: testRoot
  });
  const statusNode = renderer.createTextNode({
    text: "",
    fontSize: 30,
    offsetY: -5,
    zIndex: 100,
    parent: testRoot
  });
  statusNode.on("loaded", (target, { dimensions }) => {
    statusNode.x = renderer.settings.appWidth - dimensions.width;
  });
  function updateStatus() {
    const modeName = modes[curMode];
    if (!modeName)
      return;
    statusNode.text = [
      `mode: ${modeName}`,
      `moveStep: ${moveStep}`,
      `x: ${msdfTextNode.x}`,
      `y: ${msdfTextNode.y}`,
      `scrollY: ${msdfTextNode.scrollY}`,
      `offsetY: ${msdfTextNode.offsetY}`,
      `fontSize: ${Number(msdfTextNode.fontSize).toFixed(1)}`,
      `letterSpacing: ${msdfTextNode.letterSpacing}`,
      `color: ${curColorIdx}`,
      `fontFamily: ${msdfTextNode.fontFamily}`,
      `pixelRatio: TBD`,
      `fps: TBD`
    ].join("\n");
  }
  function setMode(mode) {
    if (mode < 0) {
      mode = modes.length - 1;
    } else if (mode >= modes.length) {
      mode = 0;
    }
    curMode = mode;
    const modeName = modes[curMode];
    if (!modeName)
      return;
    canvasTextNode.alpha = 0;
    msdfTextNode.alpha = 0;
    ssdfTextNode.alpha = 0;
    const curColor = colors[curColorIdx];
    if (modeName === "canvas") {
      canvasTextNode.color = curColor;
      canvasTextNode.alpha = 1;
    } else if (modeName === "ssdf") {
      ssdfTextNode.color = curColor;
      ssdfTextNode.alpha = 1;
    } else if (modeName === "msdf") {
      msdfTextNode.color = curColor;
      msdfTextNode.alpha = 1;
    } else if (modeName === "canvas+ssdf") {
      canvasTextNode.color = Colors.Green;
      ssdfTextNode.color = curColor;
      canvasTextNode.alpha = 1;
      ssdfTextNode.alpha = 1;
    } else if (modeName === "canvas+msdf") {
      canvasTextNode.color = Colors.Green;
      msdfTextNode.color = curColor;
      canvasTextNode.alpha = 1;
      msdfTextNode.alpha = 1;
    } else if (modeName === "ssdf+msdf") {
      ssdfTextNode.color = Colors.Green;
      msdfTextNode.color = curColor;
      ssdfTextNode.alpha = 1;
      msdfTextNode.alpha = 1;
    }
  }
  window.addEventListener("keydown", (e) => {
    let changedState = false;
    if (e.metaKey)
      return;
    if (e.code === "Escape") {
      clearStorage(testName);
      setTimeout(() => {
        window.location.reload();
      }, 0);
      return;
    } else if (e.code === "ArrowLeft") {
      setMode(curMode - 1);
      changedState = true;
    } else if (e.code === "ArrowRight") {
      setMode(curMode + 1);
      changedState = true;
    } else if (e.code === "ArrowUp") {
      canvasTextNode.scrollY -= moveStep;
      ssdfTextNode.scrollY -= moveStep;
      msdfTextNode.scrollY -= moveStep;
      changedState = true;
    } else if (e.code === "ArrowDown") {
      canvasTextNode.scrollY += moveStep;
      ssdfTextNode.scrollY += moveStep;
      msdfTextNode.scrollY += moveStep;
      changedState = true;
    } else if (e.code === "KeyQ") {
      moveStep--;
      changedState = true;
    } else if (e.code === "KeyE") {
      moveStep++;
      changedState = true;
    } else if (e.code === "KeyA") {
      canvasTextNode.x -= moveStep;
      ssdfTextNode.x -= moveStep;
      msdfTextNode.x -= moveStep;
      changedState = true;
    } else if (e.code === "KeyW") {
      canvasTextNode.y -= moveStep;
      ssdfTextNode.y -= moveStep;
      msdfTextNode.y -= moveStep;
      changedState = true;
    } else if (e.code === "KeyS") {
      canvasTextNode.y += moveStep;
      ssdfTextNode.y += moveStep;
      msdfTextNode.y += moveStep;
      changedState = true;
    } else if (e.code === "KeyD") {
      canvasTextNode.x += moveStep;
      ssdfTextNode.x += moveStep;
      msdfTextNode.x += moveStep;
      changedState = true;
    } else if (e.code === "KeyR") {
      canvasTextNode.fontSize++;
      ssdfTextNode.fontSize++;
      msdfTextNode.fontSize++;
      changedState = true;
    } else if (e.code === "KeyF") {
      canvasTextNode.fontSize--;
      ssdfTextNode.fontSize--;
      msdfTextNode.fontSize--;
      changedState = true;
    } else if (e.code === "KeyT") {
      canvasTextNode.letterSpacing += 1;
      ssdfTextNode.letterSpacing += 1;
      msdfTextNode.letterSpacing += 1;
      changedState = true;
    } else if (e.code === "KeyG") {
      canvasTextNode.letterSpacing -= 1;
      ssdfTextNode.letterSpacing -= 1;
      msdfTextNode.letterSpacing -= 1;
      changedState = true;
    } else if (e.code === "KeyZ") {
      curColorIdx--;
      if (curColorIdx < 0) {
        curColorIdx = colors.length - 1;
      }
      const color = colors[curColorIdx];
      canvasTextNode.color = color;
      ssdfTextNode.color = color;
      msdfTextNode.color = color;
      changedState = true;
    } else if (e.code === "KeyX") {
      curColorIdx++;
      if (curColorIdx >= colors.length) {
        curColorIdx = 0;
      }
      const color = colors[curColorIdx];
      canvasTextNode.color = color;
      ssdfTextNode.color = color;
      msdfTextNode.color = color;
      changedState = true;
    } else if (e.code === "KeyC") {
      ssdfTextNode.offsetY -= 1;
      msdfTextNode.offsetY -= 1;
      changedState = true;
    } else if (e.code === "KeyV") {
      ssdfTextNode.offsetY += 1;
      msdfTextNode.offsetY += 1;
      changedState = true;
    } else if (e.code === "Slash") {
      canvasTextNode.debug = {
        ...canvasTextNode.debug,
        sdfShaderDebug: !canvasTextNode.debug.sdfShaderDebug
      };
      ssdfTextNode.debug = {
        ...ssdfTextNode.debug,
        sdfShaderDebug: !ssdfTextNode.debug.sdfShaderDebug
      };
      msdfTextNode.debug = {
        ...msdfTextNode.debug,
        sdfShaderDebug: !msdfTextNode.debug.sdfShaderDebug
      };
      changedState = true;
    }
    if (changedState) {
      updateStatus();
      saveStorage(testName, {
        curMode,
        moveStep,
        curColorIdx,
        mutableProps: {
          x: canvasTextNode.x,
          y: canvasTextNode.y,
          fontSize: canvasTextNode.fontSize,
          letterSpacing: canvasTextNode.letterSpacing,
          scrollY: canvasTextNode.scrollY
          // debug: canvasTextNode.debug,
        }
      });
    }
  });
  setMode(curMode);
  updateStatus();
}
const sdfOffsetY = 6;
function getFontProps(fontType) {
  if (fontType === "msdf") {
    return {
      fontFamily: `${FONT_FAMILY}`,
      offsetY: sdfOffsetY,
      textRendererOverride: "sdf"
    };
  } else if (fontType === "ssdf") {
    return {
      fontFamily: `${FONT_FAMILY}-ssdf`,
      offsetY: sdfOffsetY,
      textRendererOverride: "sdf"
    };
  }
  return {
    fontFamily: `${FONT_FAMILY}`,
    offsetY: 0,
    textRendererOverride: "canvas"
  };
}
export {
  Colors,
  text as default
};
//# sourceMappingURL=text-10a51829.js.map
