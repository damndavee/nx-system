import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg';
import { Stack } from 'expo-router';
import { cssInterop } from 'nativewind';
import { FormControl, FormControlProps } from '../../../components/FormControl';
import { Formik } from 'formik';
import { SignInForm, validationSigninSchema } from '../../../services/validation/auth.schema';
import { Divider } from '../../../components/Divider';

const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" width="693" height="553.87726" viewBox="0 0 693 553.87726" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" artist="Katerina Limpitsouni" source="https://undraw.co/"><rect x="46" y="269.03552" width="580" height="14.23313" fill="#e6e6e6"/><g><path d="M63.69257,262.60059c1.42059-1.44373,2.30743-3.41333,2.30743-5.60059v-34c0-2.21002-.90002-4.21002-2.34003-5.66003-.75-.75-1.65997-1.34998-2.65997-1.76001-.92999-.37-1.94-.57996-3-.57996-4.41998,0-8,3.57996-8,8v34c0,2.00299,.74023,3.8288,1.95563,5.23181-3.53516,1.82953-5.95563,5.513-5.95563,9.76819h23c0-3.98853-2.13-7.4707-5.30743-9.39941Z" fill="#3f3d56"/><path d="M620.26245,261.33936c1.67493-1.46613,2.73755-3.61444,2.73755-6.01654v-34c0-4.42004-3.58002-8-8-8-1.06,0-2.07001,.20996-3,.57996-1,.41003-1.90997,1.01001-2.65997,1.76001-1.44,1.45001-2.34003,3.45001-2.34003,5.66003v34c0,2.23566,.92926,4.24103,2.40564,5.69226-3.77777,1.74164-6.40564,5.55206-6.40564,9.98492h23c0-4.16858-2.3194-7.79468-5.73755-9.66064Z" fill="#3f3d56"/></g><rect x="46" y="282.38" width="14.22998" height="10.62" fill="#e6e6e6"/><polygon points="68.17999 293 53.10999 293 52.45001 291 49.89001 283.26996 49.82001 283.06 51.76001 282.38 63.25 278.34998 64.90002 283.26996 67.5 291 68.17999 293" fill="#e6e6e6"/><polygon points="622.17999 283.06 622.10999 283.26996 619.54999 291 618.89001 293 603.82001 293 604.5 291 607.09998 283.26996 608.75 278.34998 620.23999 282.38 622.17999 283.06" fill="#e6e6e6"/><rect x="611.77002" y="282.38" width="14.22998" height="10.62" fill="#e6e6e6"/><rect x="74" width="266" height="103" fill="#3f3d56"/><rect x="74" width="266" height="103" fill="#3f3d56"/><path d="M78,0V99h201.3937c31.2628,0,56.6063-25.3435,56.6063-56.6063V0H78Z" fill="#fff"/><path d="M670.31,0H22.69C10.17999,0,0,10.17999,0,22.69v247.62c0,12.51001,10.17999,22.69,22.69,22.69H670.31c12.51001,0,22.69-10.17999,22.69-22.69V22.69c0-12.51001-10.17999-22.69-22.69-22.69Zm20.69,270.31c0,11.42999-9.26001,20.69-20.69,20.69H22.69c-11.42999,0-20.69-9.26001-20.69-20.69V22.69C2,11.26001,11.26001,2,22.69,2H535.32001c85.97998,0,155.67999,69.70001,155.67999,155.67999v112.63Z" fill="#3f3d56"/><path d="M361.37,209.22998h-37.13c-1.08997,0-1.96997,.89001-1.96997,1.98999v58.65002h41.08997v-58.65002c0-1.09998-.89001-1.98999-1.98999-1.98999Zm-14.04999,28.95001c0,.98999-.33002,1.89001-.89001,2.63-.79999,1.06-2.07001,1.75-3.5,1.75-1.41998,0-2.69-.69-3.48999-1.75-.56-.73999-.89001-1.64001-.89001-2.63v-6.81c.02002-2.39001,1.98004-4.34003,4.38-4.34003s4.37,1.95001,4.39001,4.34003v6.81Z" fill="#2f2e41"/><path d="M322.14001,268v5.64996c0,.61005,.48999,1.11005,1.09998,1.11005h39.14001c.59998,0,1.09998-.5,1.09998-1.11005v-5.64996h-41.33997Z" fill="#3f3d56"/><path d="M422.85999,117.70001h-158.71997c-2.83002,0-5.14001,2.31-5.14001,5.13995v107.10004c0,2.83997,2.31,5.14996,5.14001,5.14996h158.71997c2.83002,0,5.14001-2.31,5.14001-5.14996V122.83997c0-2.82996-2.31-5.13995-5.14001-5.13995Z" fill="#3f3d56"/><path d="M421.52002,121.40997h-156.05005c-1.51878,0-2.75,1.23122-2.75,2.75v73.73147c0,18.41321,15.06535,33.47856,33.47856,33.47856h125.3315c1.5125,0,2.75-1.2375,2.75-2.75V124.16998c0-1.51801-1.242-2.76001-2.76001-2.76001Z" fill="#fff"/><g><path d="M392.79999,274.66998l-1.19-5.63-.25-1.21002c-.15997-.78998-.85999-1.35999-1.66998-1.35999h-89.97003c-.79999,0-1.5,.57001-1.66998,1.35999l-.25,1.21002-1.19,5.63c-.09998,.51001,.02002,1.03003,.35004,1.42999,.32001,.40002,.81,.63,1.32001,.63h92.84998c.52002,0,1-.22998,1.33002-.63,.32001-.39996,.44995-.91998,.33997-1.42999Z" fill="#3f3d56"/><rect x="300.38379" y="267.70318" width="2.85965" height="1.71579" rx=".36914" ry=".36914" fill="#e6e6e6"/><rect x="386.10582" y="270.56284" width="2.85965" height="1.71579" rx=".36914" ry=".36914" fill="#e6e6e6"/><rect x="327.76889" y="273.99442" width="22.87723" height="1.71579" rx=".36914" ry=".36914" fill="#e6e6e6"/></g><g><path d="M93.65625,194.89459c-12.00142-39.79705-12.75311-79.6503,1.39777-119.57791,.06463-5.03922,4.19611-9.07521,9.2355-9.02204l90.30785,1.05557c5.03922,.06463,9.07521,4.19611,9.02195,9.23546l-1.39768,119.57794c-.06463,5.03922-4.19602,9.07524-9.23538,9.02198l-90.30785-1.05557c-5.03922-.06463-9.07532-4.19606-9.02215-9.23544Z" fill="#f2f2f2"/><path d="M112.39368,199.63136c-5.03922-.06463-9.07515-4.19599-9.02198-9.23538-12.00156-39.7972-12.75317-79.65042,1.39759-119.57798,.0283-1.58899,.47583-3.14223,1.29725-4.50263l-1.77709-.02085c-5.0393-.05314-9.17075,3.98276-9.23555,9.02192-14.15079,39.92765-13.39916,79.78077-1.39759,119.57798-.05326,5.03935,3.98276,9.17075,9.02198,9.23538l90.30778,1.05574c3.26541,.02706,6.29484-1.69752,7.9383-4.51928l-88.53069-1.03489Z" isolation="isolate" opacity=".2"/><path d="M178.91372,134.16089l-60.51899-.53959c-2.00539-.02028-3.61469-1.6623-3.59446-3.66781,.02021-2.00197,1.6571-3.6099,3.65915-3.59449l60.51899,.53959c2.00533,.02419,3.61134,1.66954,3.58715,3.67487-.02407,1.99641-1.65542,3.5989-3.65192,3.5874l.00009,.00003Z" fill="#fff"/><path d="M131.88649,113.82656l-13.31412-.11873c-2.00544-.01154-3.62188-1.64673-3.61034-3.65217,.01154-2.00544,1.64673-3.62188,3.65217-3.61034l.02294,.00025,13.31412,.11873c2.00533,.02419,3.61134,1.66954,3.58715,3.67487-.02407,1.99641-1.65542,3.5989-3.65192,3.5874Z" fill="#fff"/><path d="M178.62904,166.08774l-60.51899-.53959c-2.00533-.02419-3.61134-1.66954-3.58715-3.67487,.02407-1.99641,1.65542-3.5989,3.65192-3.5874l60.51899,.53959c2.00544,.01154,3.62188,1.64673,3.61034,3.65217s-1.64673,3.62188-3.65217,3.61034l-.02294-.00025Z" fill="#fff"/><path d="M178.77136,150.12436l-60.51899-.53959c-2.00547-.01549-3.6186-1.65379-3.60314-3.65918,.01549-2.00547,1.65374-3.61871,3.65921-3.60323l.00862,.00011,60.51899,.53959c2.00533,.02419,3.61134,1.66954,3.58715,3.67487-.02407,1.99641-1.65542,3.5989-3.65192,3.5874l.00009,.00003Z" fill="#fff"/><circle cx="116.53324" cy="77.06242" r="7.8162" fill="#3f3d56"/><circle cx="182.34773" cy="79.06242" r="7.8162" fill="#3f3d56"/></g><g><ellipse cx="273.42234" cy="132.03768" rx="3.32079" ry="3.39479" fill="#f2f2f2"/><ellipse cx="284.89415" cy="132.03768" rx="3.32079" ry="3.39479" fill="#f2f2f2"/><ellipse cx="296.36596" cy="132.03768" rx="3.32079" ry="3.39479" fill="#f2f2f2"/><path d="M309.44687,134.72082c-.10201,0-.20382-.0395-.28071-.11811l-2.24068-2.29054c-.14937-.15263-.14937-.39652,0-.54915l2.24068-2.29035c.15205-.15493,.40093-.15742,.55528-.00614,.15512,.15167,.1578,.40036,.00614,.55528l-1.97206,2.01577,1.97206,2.01596c.15167,.15493,.14898,.40361-.00614,.55528-.07631,.07478-.17544,.11198-.27457,.11198Z" fill="#f2f2f2"/><path d="M313.21209,134.72082c-.09913,0-.19826-.0372-.27457-.11198-.15512-.15167-.1578-.40016-.00614-.55528l1.97186-2.01596-1.97186-2.01577c-.15167-.15493-.14898-.40361,.00614-.55528,.15473-.15186,.40361-.14898,.55528,.00614l2.24049,2.29035c.14937,.15263,.14937,.39652,0,.54915l-2.24049,2.29054c-.07689,.07861-.1787,.11811-.28071,.11811Z" fill="#f2f2f2"/><path d="M404.5153,129.03593h-4.16639c-.47516,0-.85998,.38482-.85998,.85998v4.17032c0,.47516,.38482,.85998,.85998,.85998h4.16639c.47516,0,.86391-.38482,.86391-.85998v-4.17032c0-.47516-.38875-.85998-.86391-.85998Z" fill="#f2f2f2"/><path d="M394.30548,129.03593h-4.16639c-.47516,0-.85998,.38482-.85998,.85998v4.17032c0,.47516,.38482,.85998,.85998,.85998h4.16639c.47516,0,.86391-.38482,.86391-.85998v-4.17032c0-.47516-.38875-.85998-.86391-.85998Z" fill="#f2f2f2"/><path d="M414.13609,129.23227h-4.16639c-.47516,0-.85998,.38482-.85998,.85998v4.17032c0,.47516,.38482,.85998,.85998,.85998h4.16639c.47516,0,.86391-.38482,.86391-.85998v-4.17032c0-.47516-.38875-.85998-.86391-.85998Z" fill="#f2f2f2"/><path d="M359.19088,130.81871h-16.02549c-.58119,0-1.04849,.47123-1.04849,1.04849s.4673,1.04846,1.04849,1.04846h16.02549c.57724,0,1.04846-.47123,1.04846-1.04846s-.47123-1.04849-1.04846-1.04849Z" fill="#f2f2f2"/></g><g><path d="M303.09014,32.18977c-1.88202-6.24084-1.9999-12.49049,.21919-18.7518,.01013-.79023,.65802-1.42314,1.44828-1.4148l14.16177,.16553c.79023,.01013,1.42314,.65802,1.41479,1.44827l-.21918,18.7518c-.01013,.79023-.65801,1.42315-1.44826,1.4148l-14.16177-.16553c-.79023-.01013-1.42316-.65801-1.41482-1.44827Z" fill="#f2f2f2"/><path d="M306.02848,32.93257c-.79023-.01013-1.42313-.658-1.4148-1.44826-1.88204-6.24086-1.99991-12.49051,.21917-18.75181,.00444-.24918,.07462-.49275,.20343-.70609l-.27868-.00327c-.79025-.00833-1.43813,.62456-1.44829,1.41479-2.21908,6.26132-2.10121,12.51095-.21917,18.75181-.00835,.79025,.62456,1.43813,1.4148,1.44826l14.16176,.16556c.51207,.00424,.98714-.2662,1.24486-.7087l-13.88308-.16229Z" isolation="isolate" opacity=".2"/></g><g><path d="M273.09014,32.18977c-1.88202-6.24084-1.9999-12.49049,.21919-18.7518,.01013-.79023,.65802-1.42314,1.44828-1.4148l14.16177,.16553c.79023,.01013,1.42314,.65802,1.41479,1.44827l-.21918,18.7518c-.01013,.79023-.65801,1.42315-1.44826,1.4148l-14.16177-.16553c-.79023-.01013-1.42316-.65801-1.41482-1.44827Z" fill="#f2f2f2"/><path d="M276.02848,32.93257c-.79023-.01013-1.42313-.658-1.4148-1.44826-1.88204-6.24086-1.99991-12.49051,.21917-18.75181,.00444-.24918,.07462-.49275,.20343-.70609l-.27868-.00327c-.79025-.00833-1.43813,.62456-1.44829,1.41479-2.21908,6.26132-2.10121,12.51095-.21917,18.75181-.00835,.79025,.62456,1.43813,1.4148,1.44826l14.16176,.16556c.51207,.00424,.98714-.2662,1.24486-.7087l-13.88308-.16229Z" isolation="isolate" opacity=".2"/></g><g><path d="M249.09014,32.18977c-1.88202-6.24084-1.9999-12.49049,.21919-18.7518,.01013-.79023,.65802-1.42314,1.44828-1.4148l14.16177,.16553c.79023,.01013,1.42314,.65802,1.41479,1.44827l-.21918,18.7518c-.01013,.79023-.65801,1.42315-1.44826,1.4148l-14.16177-.16553c-.79023-.01013-1.42316-.65801-1.41482-1.44827Z" fill="#f2f2f2"/><path d="M252.02848,32.93257c-.79023-.01013-1.42313-.658-1.4148-1.44826-1.88204-6.24086-1.99991-12.49051,.21917-18.75181,.00444-.24918,.07462-.49275,.20343-.70609l-.27868-.00327c-.79025-.00833-1.43813,.62456-1.44829,1.41479-2.21908,6.26132-2.10121,12.51095-.21917,18.75181-.00835,.79025,.62456,1.43813,1.4148,1.44826l14.16176,.16556c.51207,.00424,.98714-.2662,1.24486-.7087l-13.88308-.16229Z" isolation="isolate" opacity=".2"/></g><circle cx="258.85039" cy="16.32283" r="2.75059" fill="#3f3d56"/><circle cx="281.85039" cy="16.32283" r="2.75059" fill="#3f3d56"/><circle cx="310.85039" cy="16.32283" r="2.75059" fill="#3f3d56"/><path d="M64,223v34c0,2.20917-.89486,4.20653-2.34066,5.65381-.97686,.97787-2.65934,.24141-2.65934-1.1408v-43.03862c0-1.36935,1.66515-2.12115,2.63743-1.15688l.02255,.02245c1.44,1.45001,2.34003,3.45001,2.34003,5.66003Z" fill="#6c63ff"/><path d="M609,221.32283v34c0,2.20917,.89486,4.20653,2.34066,5.65381,.97686,.97787,2.65934,.24141,2.65934-1.1408v-43.03862c0-1.36935-1.66515-2.12115-2.63743-1.15688l-.02255,.02245c-1.44,1.45001-2.34003,3.45001-2.34003,5.66003Z" fill="#6c63ff"/><rect x="434" y="30" width="69" height="82" fill="#3f3d56"/><path d="M438,108h61V34h-61V108Z" fill="#fff"/><path d="M468.34003,40c-4.49005,0-8.70001,1.21997-12.31,3.33997-5.14001,3.02002-9.08002,7.87-10.91003,13.66003-.72998,2.32001-1.12,4.77997-1.12,7.33997v37.66003h49V40h-24.65997Z" fill="#3f3d56"/><path d="M481.18138,101.97209h-28.18138c1.36522-3.86647,4.27507-7.00551,7.99204-8.65969,1.86347-.8371,3.92626-1.30543,6.09865-1.30543,1.56453,0,3.07925,.23915,4.49428,.69757,4.47433,1.40505,8.04186,4.86292,9.59641,9.26755Z" fill="#6c63ff"/><g><path d="M448,86.00001c-1.38,0-2.72998,.19-4,.53998v15.46002h18.96002c.02997-.33002,.03998-.66003,.03998-1,0-2.81-.78003-5.45001-2.12-7.69-2.63-4.38-7.41003-7.31-12.88-7.31Z" fill="#6c63ff"/><path d="M493,56.97206v-12.95465c-2.49127-1.87341-5.6004-2.9895-8.96863-2.9895-5.19183,0-9.76581,2.6507-12.44641,6.67664-1.41504-.45844-2.92975-.69757-4.49426-.69757-2.17236,0-4.23517,.46832-6.09863,1.30542-.02966,.01318-.05688,.03052-.08643,.04388-.00897-.01514-.0166-.03119-.02563-.04626-1.21002-2.01001-2.87-3.72003-4.84998-4.97003-5.14001,3.02002-9.08002,7.87-10.91003,13.66003h7.89081c2.51678,6.80133,5.11401,11.13428,7.77734,13.43878-5.51428,2.57642-7.62506,9.41724-4.73889,14.79279,5.68243,10.58337,10.10852,12.78088,13.90045,10.745-.55579,1.5639-.86597,3.24493-.86597,4.99902,0,.33875,.00995,.6676,.03979,.99646h23.87646v-12.95465c-2.49127-1.87341-5.6004-2.9895-8.96863-2.9895-2.7218,0-5.27026,.73401-7.46863,2.00726l.04715-.08388c3.08087-5.48959,8.82216-8.95128,15.11718-8.95128h1.27292v-12.95465c-2.49127-1.87347-5.6004-2.98956-8.96863-2.98956-3.17188,0-6.11035,.99316-8.53015,2.68109l.09723-.1246c4.19293-5.39369,10.56981-8.64023,17.40153-8.64023h.00001Z" fill="#6c63ff"/></g><rect x="466" y="45" width="1" height="57" fill="#3f3d56"/><g><polygon points="507.17821 536.66028 499.59274 536.59634 496.23484 506.65559 507.43029 506.74997 507.17821 536.66028" fill="#ffb6b6"/><path d="M482.88085,548.7225c-.01648,1.867,1.48857,3.40395,3.36238,3.42112l15.08185,.12584,2.64029-5.35183,.96971,5.37913,5.6907,.05161-1.43698-19.18544-1.97987-.13172-8.07563-.55668-2.60536-.17447-.04572,5.4283-12.11528,8.21743c-.92175,.62621-1.47687,1.66339-1.48608,2.77672Z" fill="#2f2e41"/></g><g><polygon points="590.14701 536.66028 582.56153 536.59634 579.20363 506.65559 590.39909 506.74997 590.14701 536.66028" fill="#ffb6b6"/><path d="M565.84964,548.7225c-.01648,1.867,1.48857,3.40395,3.36238,3.42112l15.08185,.12584,2.64029-5.35183,.96971,5.37913,5.6907,.05161-1.43698-19.18544-1.97987-.13172-8.07563-.55668-2.60536-.17447-.04572,5.4283-12.11528,8.21743c-.92175,.62621-1.47687,1.66339-1.48608,2.77672Z" fill="#2f2e41"/></g><path d="M465.06779,105.22923c3.18889,2.97208,2.89109,8.29481-.6205,10.87762l8.65044,34.59206-8.97985,4.74514-9.97385-41.16064c-1.75164-2.70865-1.50186-6.35699,.81882-8.79818,2.7196-2.86106,7.24373-2.97566,10.10495-.256Z" fill="#ffb6b6"/><path d="M509.53888,300.49269h63.27158s19.31564,28.31858,14.91022,54.75112l-9.17796,78.19625,19.45728,91.41252-18.72305,1.83559-32.30643-93.24811-4.40542-56.53626-8.07661,60.94168-24.94961,86.08786-18.00326,.185,10.64644-87.0071,4.4148-81.98423s2.6979-5.67667,.42647-7.9196,.33526-6.22586,.33526-6.22586c0,0,3.47957-5.50776,.43644-8.10479-3.04313-2.59702,1.74386-32.38408,1.74386-32.38408Z" fill="#2f2e41"/><path d="M595,323.67161s-57.2705-15.41898-55.06778,2.20271c.9751,7.80079-30.97012,2.87085-40.83092,1.71074l9.62584-41.72666-15.96231,40.86762c-2.9076-.45522-4.71379-.80764-4.71379-.80764l21.04322-51.44065s2.20271-49.92812-2.31286-62.16789c-4.51553-12.23972,6.7183-17.12971,6.7183-17.12971,11.09631-8.23285,16.39447-16.36554,11.6817-24.32529l24.2959,2.09256,2.20271,11.9534,20.66144,10.05906-10.06789,59.54741s-1.30983,1.44571-.44491,2.63148,1.01485,2.13011-.52859,3.12642c-1.54344,.9963-.8239,4.87305-.8239,4.87305,0,0,.0734,2.39744,1.51253,2.56441s.94888,1.60879,.94888,1.60879c0,0-.09444,2.91049,1.29925,2.20282,.93644-.4755,21.71928,39.48304,23.30428,38.84496,1.585-.63807,1.03838,4.07502,2.41305,4.2883s1.38401,2.46667,1.97743,3.52674c1.89247,3.38067,3.06842,5.49739,3.06842,5.49739Z" fill="#6c63ff"/><path d="M530.1033,215.42907l2.49756-23.30227-32.57816-7.86892-32.71691-60.29877-10.27932,4.40542v10.27932s-8.81085,8.81085,20.90552,50.72701l8.46396,11.68314,46.20491,21.69792-2.49756-7.32286Z" fill="#6c63ff"/><g><path d="M502.11529,76.79168c-1.08538,4.22187,2.03307,8.54569,6.38295,8.82981l11.34832,33.8032,10.12167-.84014-13.77213-40.05002c.01646-3.22564-2.15948-6.1647-5.42975-6.97109-3.83256-.94521-7.70575,1.39556-8.65107,5.22825Z" fill="#ffb6b6"/><path d="M571.67988,203.33867h.00002c8.30092-5.4372,9.32173-17.21077,2.0805-23.99552l-34.93692-32.73453s1.31767-51.27846-12.26029-51.40353l-2.93491-9.17125-15.79289,7.53665,1.91931,7.57998s1.03335,31.36758,10.31114,40.72203c.16782,13.21348,5.70567,16.71574,5.70567,16.71574l45.90837,44.75043Z" fill="#6c63ff"/></g><circle cx="540.2959" cy="149.11974" r="20.81642" fill="#ffb6b6"/><path d="M590.87561,205.44773c-.1499,2.99023-1.57983,5.86035-4.22998,7.23047-.83984,.41992-1.71997,.73975-2.62988,.96973-.03003-.2998-.08008-.58984-.12988-.87988-.83008-4.91992-2.89014-9.60986-5.90015-13.57031-1.42993-1.87988,2.53003,8.78027,3.53003,14.78027-.90991-1.81982-5.54004-13.5-5.84009-13.93994,0,.02002,.02002,.08008,.06006,.20996,1.5,4.52979,2.17993,9.33008,2.07007,14.10986-5.80005,8.27002-10.8501,10.5-15.5,9.57031,1.3999-3.78027,1.25-8.16016-.64014-11.74023-.52002,3.52002-2.34985,6.79004-4.96997,9.18994-2.19995-1.52979-4.33984-3.56006-6.46997-5.70996,3.3501-4.02979,5.66992-8.8999,6.63013-14.0498,1.36987-7.20996,.05981-14.8999-3.61011-21.25,1.77002,12.88965-3.15991,26.43994-12.55005,35.3999-2.21997-.33984-4.21997-1.22021-5.10986-3.2002-.83008-1.85986-.27002-4.06006,.78003-5.7998,1.02979-1.74023-2.58008-10.1499-1.37012-11.77002,5.06006-6.74023,9.87012-9.97998,4.44995-16.43018-2.48999-2.96973-5.95996-5.25-7.44995-8.83008-1.87988-4.50977-.07007-9.65967,2.11011-14.01953,2.18994-4.37012,9.47998-2.33008,4.59985-2.73047-8.38989-.67969-4.72998-7.48975-6.56982-10.32959-1.03003-1.59033-3.57007-1.33008-5.47021-1.3501-.66992-2.25-1.60986-4.43018-2.79004-6.47021,.30005,2.20996,.41016,4.4502,.33008,6.68018-1.52002,.25977-3.98999,2.81006-5.2998,3.62988l-.48022,.22998c-1.84985-1.06006-1.57544-3.04189-1.58545-5.18154-.02002-2.14014-4.14014-4.18994-3-6,3.03003-4.79004,2.05542-7.48838,7.67554-8.21836s10.8501-2.85986,15,1c4-8,19.57007-.93994,23.33008,.56982,3.76001,1.52002,6.79004,4.74023,8.06982,8.58008,2.97998,8.8999,1.47021,13,6.6001,20.8501,4.39014,6.71973,10.6001,3.5498,13.51001,11.02979,1.83008,4.72021-.3501,9.93994-2.29004,14.61035-1.93994,4.67969-5.94995,15.32959-.94995,14.56982,4.26001-.66016,6.33008,3.58008,6.08984,8.25977Z" fill="#2f2e41"/><path d="M610.52373,536.54431c2.06592,.12937,3.20768-2.43737,1.64468-3.93333l-.1555-.61819c.02047-.04951,.04105-.09897,.06178-.14839,2.08924-4.9818,9.16992-4.94742,11.24139,.04177,1.83859,4.42817,4.17942,8.86389,4.75579,13.54594,.25838,2.0668,.14213,4.17236-.31648,6.20047,4.30807-9.41059,6.57515-19.68661,6.57515-30.02077,0-2.59652-.14213-5.19301-.43275-7.78295-.239-2.11854-.56839-4.2241-.99471-6.31034-2.30575-11.2772-7.29852-22.01825-14.50012-30.98962-3.46197-1.89248-6.34906-4.85065-8.09295-8.39652-.62649-1.27891-1.11739-2.65462-1.34991-4.05618,.39398,.05168,1.48556-5.94866,1.18841-6.3168,.54906-.83317,1.53178-1.24733,2.13144-2.06034,2.98232-4.04341,7.0912-3.33741,9.23621,2.15727,4.58224,2.31266,4.62659,6.14806,1.81495,9.83683-1.78878,2.34682-2.03456,5.52233-3.60408,8.03478,.16151,.20671,.32944,.40695,.4909,.61366,2.96106,3.79788,5.52208,7.88002,7.68104,12.16859-.61017-4.76621,.29067-10.50822,1.82641-14.20959,1.74819-4.21732,5.02491-7.76915,7.91045-11.41501,3.46601-4.37924,10.57337-2.46806,11.18401,3.08332,.00591,.05375,.01166,.10745,.01731,.1612-.4286,.24178-.84849,.49867-1.25864,.76992-2.33949,1.54723-1.53096,5.17386,1.24107,5.60174l.06277,.00967c-.15503,1.54366-.41984,3.07444-.80734,4.57937,3.70179,14.31579-4.29011,19.5299-15.70147,19.76412-.25191,.12916-.49738,.25832-.74929,.38109,1.15617,3.25525,2.07982,6.59447,2.76441,9.97891,.61359,2.99043,1.03991,6.01317,1.27885,9.04888,.29715,3.83006,.27129,7.67959-.05168,11.50323l.01939-.13562c.82024-4.21115,3.10671-8.14462,6.4266-10.87028,4.94561-4.06264,11.93282-5.55869,17.26826-8.82425,2.56833-1.57196,5.85945,.45945,5.41121,3.43708l-.02182,.14261c-.79443,.32289-1.56947,.69755-2.31871,1.11733-.4286,.24184-.84848,.49867-1.25864,.76992-2.33949,1.54729-1.53096,5.17392,1.24107,5.6018l.06282,.00965c.0452,.00646,.08397,.01295,.12911,.01944-1.36282,3.23581-3.26168,6.23922-5.63854,8.82922-2.31463,12.49713-12.25603,13.68282-22.89022,10.04354h-.00648c-1.16259,5.06378-2.86128,10.01127-5.0444,14.72621h-18.02019c-.06463-.20022-.12274-.40692-.18089-.60717,1.6664,.10341,3.34571,.00649,4.98629-.29702-1.33701-1.64059-2.67396-3.29409-4.01097-4.93462-.03229-.0323-.05816-.0646-.08397-.09689-.67817-.8396-1.36282-1.67283-2.04099-2.51246l-.00036-.00102c-.04245-2.57755,.26652-5.14662,.87876-7.63984l.00057-.00035Z" fill="#f2f2f2"/><path d="M409.16618,552.68726c0,.66003,.53003,1.19,1.19006,1.19h253.28998c.65997,0,1.19-.52997,1.19-1.19,0-.65997-.53003-1.19-1.19-1.19h-253.28998c-.66003,0-1.19006,.53003-1.19006,1.19Z" fill="#ccc"/></svg>`;

const googleMarkup = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="#4285F4" d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"/><path fill="#34A853" d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"/><path fill="#FBBC04" d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"/><path fill="#EA4335" d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"/></svg>`;
const facebookMarkup = `<?xml version="1.0" encoding="utf-8"?><!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"/>
<path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"/>
<defs>
<linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse">
<stop stop-color="#18ACFE"/>
<stop offset="1" stop-color="#0163E0"/>
</linearGradient>
</defs>
</svg>`;
const appleMarkup = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
<svg width="800px" height="800px" viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>apple [#173]</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#173]">

</path>
            </g>
        </g>
    </g>
</svg>`;

const SigninScreen = () => {
  cssInterop(ScrollView, {
      className: "style",
      contentContainerClassName: "contentContainerStyle",
  });

  const INIT_STATE = {
    email: '', password: ''
  }

  const INPUT_MAP: Pick<FormControlProps<typeof INIT_STATE>, 'id' | 'placeholder' | 'label' | 'helperText' | 'icon' | 'type'>[] = [
    {
      id: 'email',
      placeholder: 'Enter Your email',
      label: 'Email',
      helperText: '',
      icon: 'at-outline',
      type: 'text'
    },
    {
      id: 'password',
      placeholder: 'Enter Your password',
      label: 'Password',
      helperText: '',
      icon: 'lock-open-outline',
      type: 'password'
    },
  ]

  const handleFormSubmission = (values: SignInForm) => {
    console.log("SUBMITTING!@#");
  }

  return (
    <>
      <Stack.Screen options={{ 
        title: 'Zaloguj się', 
        headerShadowVisible: false 
      }} />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className='flex-1 bg-white'>
        <ScrollView className="flex-1 bg-white px-8" contentContainerClassName='items-center'>
          <SvgXml xml={svgMarkup} width="200" height="200" />
          <View className='w-full gap-5'>
            <Formik initialValues={INIT_STATE} validationSchema={validationSigninSchema} onSubmit={handleFormSubmission}>
              {({ handleChange, handleBlur, handleSubmit, values, errors, touched, handleReset }) => (
                <View className='gap-6'>
                  <View className='gap-3'>
                    {INPUT_MAP.map(({ id, ...input }) => {
                      return (
                        <FormControl
                          {...input}
                          key={id}
                          id={id}
                          value={values[id]}
                          onChange={handleChange(id)}
                          onBlur={() => handleBlur(id)}
                          error={errors[id]}
                          variant='filled'
                          size='lg'
                        />
                      )
                    })}
                  </View>
                  <Pressable className='self-end'><Text className="text-[#6c63ff] text-center underline">Przypomnij hasło.</Text></Pressable>
                  <Pressable onPress={() => handleSubmit()} className="bg-[#6c63ff] active:bg-[#5b52ee] px-12 py-4 rounded-lg w-full">
                    <Text className="text-white font-semibold text-center">Zaloguj</Text>
                  </Pressable>
                </View>
              )}
            </Formik>
            <Divider />
            <View className='gap-5 flex-row items-center justify-center'>
              <Pressable className='p-3'>
                <SvgXml xml={googleMarkup} width="40" height="40" />
              </Pressable>
              <Pressable className='p-3'>
                <SvgXml xml={facebookMarkup} width="40" height="40" />
              </Pressable>
              <Pressable className='p-3'>
                <SvgXml xml={appleMarkup} width="40" height="40" />
              </Pressable>
            </View>
            <View className='flex-row justify-center gap-1 mt-10'>
                <Text className="text-gray-800 text-center">Nie posiadasz konta?</Text>
                <Pressable><Text className="text-[#6c63ff] text-center underline">Zarejestruj się.</Text></Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export { SigninScreen };