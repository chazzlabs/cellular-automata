(function(window) {

    window.startAutomata = function(rules) {
        let container = document.getElementById('container');

        function getRandomBinary() {
            return Math.floor(Math.random() * (2));
        }

        function setActive(node, active) {
            active ? node.classList.add('active') : node.classList.remove('active');
        }

        function createRandomRow() {
            let row = document.createElement('div');
            row.classList.add('row');

            let cells = document.body.clientWidth / 13;

            for (let i = 0; i < cells; i++) {
                let cell = document.createElement('div');
                cell.classList.add('cell');

                if (getRandomBinary()) {
                    setActive(cell, true);
                }

                row.appendChild(cell);
            }

            container.appendChild(row);
        }

        function duplicateRow() {
            let lastRow = container.lastChild;
            let clone = lastRow.cloneNode(true);
            container.appendChild(clone);

            processRow(clone, lastRow);
        }

        function isActive(cell) {
            return cell.classList.contains('active') ? 1 : 0
        }

        function setActiveIfMatchesRule(target, leftSibling, prevSelf, rightSibling, rule, ruleValue) {
            let matchesRule =
                isActive(leftSibling) === rule[0] &&
                isActive(prevSelf) === rule[1] &&
                isActive(rightSibling) === rule[2];

            if(matchesRule) {
                setActive(target, ruleValue);
            }
        }

        function processRow(row, parentRow) {
            for (let i = 0; i < row.childNodes.length; i++) {
                let target = row.childNodes[i];
                let prevSelf = parentRow.childNodes[i];
                let leftSibling = prevSelf.previousElementSibling || parentRow.lastChild;
                let rightSibling = prevSelf.nextElementSibling || parentRow.firstChild;

                let toggleClass = setActiveIfMatchesRule.bind(null, target, leftSibling, prevSelf, rightSibling);

                rules.forEach(function(rule) {
                    toggleClass(rule.matchers, rule.result);
                });
            }
        }

        createRandomRow();
        setInterval(duplicateRow, 100);
    };


})(window);
