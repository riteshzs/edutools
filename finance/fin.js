document.addEventListener('DOMContentLoaded', function() {
    let expenses = [];
    let budgets = {};
    let goals = [];

    function addExpense(amount, category, date) {
        expenses.push({ amount, category, date });
        updateExpenseDisplay();
    }

    // Function to set a budget
    function setBudget(category, amount) {
        budgets[category] = amount;
        updateBudgetDisplay();
    }

    // Function to add a savings goal
    function addGoal(name, targetAmount, currentAmount) {
        goals.push({ name, targetAmount, currentAmount });
        updateGoalsDisplay();
    }

    // Function to update the expense display
    function updateExpenseDisplay() {
        const expenseList = document.getElementById('expense-list');
        expenseList.innerHTML = '';
        expenses.forEach(expense => {
            const li = document.createElement('li');
            li.textContent = `$${expense.amount} - ${expense.category} (${expense.date})`;
            expenseList.appendChild(li);
        });
    }


    function updateBudgetDisplay() {
        const budgetList = document.getElementById('budget-list');
        budgetList.innerHTML = '';
        for (const [category, amount] of Object.entries(budgets)) {
            const li = document.createElement('li');
            li.textContent = `${category}: $${amount}`;
            budgetList.appendChild(li);
        }
    }

    function updateGoalsDisplay() {
        const goalList = document.getElementById('goal-list');
        goalList.innerHTML = '';
        goals.forEach(goal => {
            const li = document.createElement('li');
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            li.textContent = `${goal.name}: $${goal.currentAmount} / $${goal.targetAmount} (${progress.toFixed(2)}%)`;
            goalList.appendChild(li);
        });
    }

    // Event listeners for form submissions
    document.getElementById('expense-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const amount = document.getElementById('expense-amount').value;
        const category = document.getElementById('expense-category').value;
        const date = document.getElementById('expense-date').value;
        addExpense(parseFloat(amount), category, date);
        this.reset();
    });

    document.getElementById('budget-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const category = document.getElementById('budget-category').value;
        const amount = document.getElementById('budget-amount').value;
        setBudget(category, parseFloat(amount));
        this.reset();
    });

    document.getElementById('goal-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('goal-name').value;
        const targetAmount = document.getElementById('goal-target').value;
        const currentAmount = document.getElementById('goal-current').value;
        addGoal(name, parseFloat(targetAmount), parseFloat(currentAmount));
        this.reset();
    });

    // Function to generate insights
    function generateInsights() {
        const insightsList = document.getElementById('insights-list');
        insightsList.innerHTML = '';

        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        const expensesByCategory = expenses.reduce((acc, expense) => {
            acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
            return acc;
        }, {});
        const highestCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];

        const budgetCompliance = Object.entries(budgets).map(([category, budget]) => {
            const spent = expensesByCategory[category] || 0;
            return { category, budget, spent, compliance: (spent / budget) * 100 };
        });

        const insights = [
            `Total expenses: $${totalExpenses.toFixed(2)}`,
            `Highest expense category: ${highestCategory[0]} ($${highestCategory[1].toFixed(2)})`,
            ...budgetCompliance.map(bc => 
                `${bc.category} budget: $${bc.spent.toFixed(2)} / $${bc.budget} (${bc.compliance.toFixed(2)}%)`
            )
        ];

        insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            insightsList.appendChild(li);
        });
    }


    document.getElementById('generate-insights').addEventListener('click', generateInsights);

    updateExpenseDisplay();
    updateBudgetDisplay();
    updateGoalsDisplay();
});