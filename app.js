const tabs = document.querySelector('.tabs');
const btn = document.querySelector('input[type="submit"]');
let submit = true;

tabs.addEventListener('click', e => {
	const tab = document.querySelectorAll('.tabs li');
	const tabsContent = document.getElementsByClassName("tabcontent");

	e.preventDefault();
	if(e.target.nodeName === 'A') {
		const tabNum = e.target.getAttribute("href").substr(1);
		for (let i = 0; i < tab.length; i++) {
		  tab[i].classList.remove('active');
		  tabsContent[i].classList.remove('active');
		}
		e.target.parentElement.classList.add('active');
		document.getElementById(tabNum).classList.add('active');	  
	}
});

validateEmail = () => {
	const email = document.getElementById('email').value;
	const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let emailResult = emailPattern.test(email);
	const emailParent = document.getElementById('email').parentElement;
	if( !emailResult && emailParent.classList.contains('active') ){
		emailParent.classList.add('error');
		submit = false;
	} else {
		emailParent.classList.remove('error');
	}
}

validatePhone = () => {
	const phone = document.getElementById('phone').value;
	const phonePattern =  /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
	let phoneResult = phonePattern.test(phone);
	const phoneParent = document.getElementById('phone').parentElement;

	if( !phoneResult && phoneParent.classList.contains('active') ) {
		phoneParent.classList.add('error');
		submit = false;
	} else {
		phoneParent.classList.remove('error');
	}
}

validateCurrency = () => {
	const currency = document.getElementsByName("currency");
	const radioGroup = document.querySelector('.radio-group');
	let check = false;

	for(let i = 0; i < currency.length; i++) {
		if(currency[i].checked) {
	       check = true;
		} 
	}

	if(check) {
		radioGroup.classList.remove('error');
	} else {
		radioGroup.classList.add('error');
		submit = false;
	}
}

validateTerms = () => {
	const terms = document.getElementById('terms');
	const termsFeedback = document.querySelector('.terms-feedback');

	if(terms.checked){
		terms.parentElement.classList.remove('error');
		termsFeedback.innerText = '';		
	} else {
		terms.parentElement.classList.add('error');
		termsFeedback.innerText = 'You must check terms and contitions';
		submit = false;
	}
}

showLoader = () => {
	const loader = document.querySelector('.loader');
	loader.classList.remove('hide');
	setTimeout(() => {
		loader.classList.add('hide');
	}, 500);
}

showSuccessMessage = () => {
	const feedback = document.querySelector('.feedback');

	if(submit) {
		setTimeout(() => {
			feedback.innerText = "B R A V O !"
		}, 500);
	} else {
		feedback.innerText = '';
	}

}

restart = () => {
	submit = true;
}

validateFrom = e => {
	e.preventDefault();
	showLoader();
	validateEmail();
	validatePhone();
	validateCurrency();
	validateTerms();
	showSuccessMessage();
	restart();
};

btn.addEventListener('click', validateFrom);
