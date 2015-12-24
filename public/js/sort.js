var compare = (function(){

    return {

        compareFirstName: function(str1, str2) {
            var rx = /([^\d]+|\d+)/ig;
            var str1split = str1.firstName.match( rx );
            var str2split = str2.firstName.match( rx );
            for(var i = 0, l = Math.min(str1split.length, str2split.length); i < l; i++) {
                var s1 = str1split[i],
                    s2 = str2split[i];
                if (s1 === s2) continue;
                if (isNaN(+s1) || isNaN(+s2))
                    return s1 > s2 ? 1 : -1;
                else
                    return +s1 - s2;
            }
            return str1split.length - str2split.length;
        },

        compareLastName: function(str1, str2) {
            var rx = /([^\d]+|\d+)/ig;
            var str1split = str1.lastName.match( rx );
            var str2split = str2.lastName.match( rx );
            for(var i = 0, l = Math.min(str1split.length, str2split.length); i < l; i++) {
                var s1 = str1split[i],
                    s2 = str2split[i];
                if (s1 === s2) continue;
                if (isNaN(+s1) || isNaN(+s2))
                    return s1 > s2 ? 1 : -1;
                else
                    return +s1 - s2;
            }
            return str1split.length - str2split.length;
        },

        compareGender: function(str1, str2) {
            var rx = /([^\d]+|\d+)/ig;
            var str1split = str1.gender.match( rx );
            var str2split = str2.gender.match( rx );
            for(var i = 0, l = Math.min(str1split.length, str2split.length); i < l; i++) {
                var s1 = str1split[i],
                    s2 = str2split[i];
                if (s1 === s2) continue;
                if (isNaN(+s1) || isNaN(+s2))
                    return s1 > s2 ? 1 : -1;
                else
                    return +s1 - s2;
            }
            return str1split.length - str2split.length;
        },

        comparePhone: function(personA, personB) {
            var person1 = personA.phone.substr(0, personA.phone.length - 10);
            var person2 = personB.phone.substr(0, personA.phone.length - 10);
            return person1 - person2;
        },

        compareAge: function(personA, personB) {
            return personA.age - personB.age;
        }

    }

})();
