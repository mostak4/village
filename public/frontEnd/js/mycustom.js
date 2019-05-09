var $=jQuery;
var window_width = jQuery(window).width();


/*### popup div position ###*/
function popup_dv_position_set(dv_id){
	var win_width = jQuery(window).width();
	var win_height = jQuery(window).height();
	var div_width = jQuery('#'+dv_id).width();
	var div_height = jQuery('#'+dv_id).height();
	var cal_left = (win_width/2) - (div_width/2);
	var cal_top = (win_height/2) - (div_height/2);
	jQuery('#'+dv_id).css({'left':cal_left, 'top':cal_top, 'position':'fixed'});
}


/*### popup close ###*/
jQuery(document).ready(function()
{
	jQuery('body').on('click', '#cboxPopup', function()
	{
		jQuery('#cboxPopup').remove();
		jQuery('#cboxClose').remove();
		
		if(jQuery('#become_a_dealer').length>0)
		{
			jQuery('#become_a_dealer').hide();
		}
		if(jQuery('#feedback_modal_box').length>0)
		{
			jQuery('#feedback_modal_box').hide();
		}
		if(jQuery('#quickview').length>0)
		{
			jQuery('#quickview').hide();
		}
		if(jQuery('#location_direction_modal_box').length>0)
		{
			jQuery('#location_direction_modal_box').hide();
		}
	});
	jQuery('body').on('click', '#cboxClose', function(){
		if(jQuery('#cboxPopup').length>0){
			jQuery('#cboxPopup').trigger('click');
		}
	});
});


jQuery(document).ready(function()
{
	/*### sticky mainmenu ###*/
	var mainmenuStickyTop = jQuery('#mainmenu').offset().top;
	jQuery(window).on( 'scroll', function()
	{
		var current_width = jQuery(window).width();
		//alert(current_width);
		
		if(current_width >= 1000)
		{
			if(jQuery(window).scrollTop() >= mainmenuStickyTop)
			{
				jQuery('#mainmenu').addClass('sticky');
				jQuery('body').addClass('sticky');
			}
			else
			{
				jQuery('#mainmenu').removeClass('sticky');
				jQuery('body').removeClass('sticky');
			}
		}
	});
	
	
	/*### scroll nav ###*/
	setTimeout(function()
	{
		if(jQuery("#catnav").length>0)
		{
			var current_width = jQuery(window).width();
			//alert(current_width);
			
			if(current_width >= 780)
			{
				var stickyTop = jQuery('#catnav').offset().top + 200;
				jQuery(window).on( 'scroll', function()
				{
					if(jQuery(window).scrollTop() >= stickyTop)
					{
						jQuery('#catnav').addClass('sticky');
						jQuery('.nav-category').css({'display':'none'});
					}
					else
					{
						jQuery('#catnav').removeClass('sticky');
						jQuery('.nav-category').css({'display':'block'});
					}
				});
			}
		}
	}, 1000);
	
	
	/*### mobile mainnav ###*/
	jQuery('body').on('click', 'a.heading-close', function()
	{
		jQuery('#mainmenu').hide();
		return false;
	});
	jQuery('body').on('click', 'a.menutoggle', function()
	{
		jQuery('#mainmenu').show();
		return false;
	});
	jQuery('body').on('click', '#mainmenu .navul>li>.caret', function()
	{
		var this_elm = jQuery(this);
		var this_parent = this_elm.parent();
		
		if(this_parent.hasClass('active'))
		{
			this_parent.removeClass('active');
		}
		else
		{
			jQuery('#mainmenu .navul>li').removeClass('active');
			
			this_parent.addClass('active');
		}
		
		return false;
	});
	jQuery('body').on('click', '#mainmenu .navul>li>ul.dropdown-menu>li>.caret', function()
	{
		var this_elm = jQuery(this);
		var this_parent = this_elm.parent();
		
		if(this_parent.hasClass('active'))
		{
			this_parent.removeClass('active');
		}
		else
		{
			jQuery('#mainmenu .navul>li>ul.dropdown-menu>li').removeClass('active');
			
			this_parent.addClass('active');
		}
		
		return false;
	});
	jQuery('body').on('click', '#mainmenu .navul>li>ul.dropdown-menu>li>ul.dropdown-menu>li>.caret', function()
	{
		var this_elm = jQuery(this);
		var this_parent = this_elm.parent();
		
		if(this_parent.hasClass('active'))
		{
			this_parent.removeClass('active');
		}
		else
		{
			jQuery('#mainmenu .navul>li>ul.dropdown-menu>li>ul.dropdown-menu>li').removeClass('active');
			
			this_parent.addClass('active');
		}
		
		return false;
	});
	
	
	/*### qty update using plus minus ###*/
	jQuery(document).on( 'click', '.plus, .minus', function()
	{
		var qty=jQuery(this).parents('.input-group').find('.quantity .qty');
		
		var currentVal	=	parseFloat(qty.val()),
			max			=	parseFloat(qty.attr('max')),
			min			=	parseFloat(qty.attr('min')),
			step		=	qty.attr('step');
		
		// Format values
		if(!currentVal || currentVal==='' || currentVal==='NaN' ) currentVal=0;
		if(max==='' || max==='NaN') max='';
		if(min==='' || min === 'NaN' ) min = 0;
		if(step==='any' || step==='' || step===undefined || parseFloat( step )==='NaN' ) step=1;

		// Change the value
		if(jQuery(this).is('.plus'))
		{
			if(max && (max==currentVal || currentVal > max))
			{
				qty.val(max);
			}
			else
			{
				qty.val(currentVal + parseFloat(step));
			}
		}
		else
		{
			if(min && (min == currentVal || currentVal < min))
			{
				qty.val( min );
			}
			else if(currentVal > 0)
			{
				qty.val( currentVal - parseFloat(step));
			}
		}

		// Trigger change event
		qty.trigger('change');
	});
	//update cart when change quantity in cart page
	jQuery('.quantity').on('input propertychange change', function()
	{
		jQuery('.cart-update-block input.cartUpdateBtn').trigger('click');
	});
	
	
	/*### wishlist ###*/
	jQuery('body').on('click', '.add_to_wish_list', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		//alert('product_id: '+product_id);
		
		var ajax_url = base_url+'ajax/add_to_wish_list';
		
		jQuery.ajax({
			type: 'POST',
			data: {"product_id" : product_id},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				this_link.attr('href', base_url+'wishlist');
				this_link.find('img').remove();
				jQuery('html, body').animate({scrollTop:jQuery('header #hpart').position().top-100}, 'slow');
			}
		});
	});
	jQuery('.remove_wish_list').on('click', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		//alert('product_id: '+product_id);
		
		var ajax_url = base_url+'ajax/remove_wish_list';
		
		jQuery.ajax({
			type: 'POST',
			data: {"product_id" : product_id},
			url: ajax_url,
			success: function(result)
			{
				if(result=='empty_wishlist')
				{
					window.location.reload();
				}
				else
				{
					this_link.parent().parent().remove();
				}
			}
		});
	});
	
	
	
	/*### compare ###*/
	jQuery('body').on('click', '.add_to_compare', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		//alert('product_id: '+product_id);
		
		var ajax_url = base_url+'ajax/add_to_compare';
		
		jQuery.ajax({
			type: 'POST',
			data: {"product_id" : product_id},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				//window.location.replace(base_url+'compare');
				this_link.attr('href', base_url+'compare');
				this_link.find('img').remove();
				jQuery('html, body').animate({scrollTop:jQuery('header #hpart').position().top-100}, 'slow');
			}
		});
	});
	jQuery('.remove_compare').on('click', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		//alert('product_id: '+product_id);
		
		var ajax_url = base_url+'ajax/remove_compare';
		
		jQuery.ajax({
			type: 'POST',
			data: {"product_id" : product_id},
			url: ajax_url,
			success: function(result)
			{
				window.location.reload();
			}
		});
	});
	
	
	
	/*### add to cart ###*/
	jQuery('body').on('click', '.buy_now', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
		
		//alert('product_id: '+product_id);
		//alert('product_price: '+product_price);
		//alert('product_title: '+product_title);
		
		var ajax_url = base_url+'ajax/add_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : 1,
				"product_price" : product_price,
				"product_title" : product_title
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success: function(result)
			{
				location.replace(base_url+'checkout');
			}
		});
		
		return false;
	});
	jQuery('body').on('click', '.add_to_cart', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		var product_price=jQuery(this).attr('data-product_price');
		var product_title=jQuery(this).attr('data-product_title');
		var product_qty=1;
		
		if(jQuery(".productprice .action-btns #product_qty").length > 0)
		{
			product_qty=jQuery(".productprice .action-btns #product_qty" ).val();
		}
		
		var ajax_url = base_url+'ajax/add_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"product_id" : product_id,
				"product_qty" : product_qty,
				"product_price" : product_price,
				"product_title" : product_title
			},
			url: ajax_url,
			beforeSend: function()
			{
				this_link.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:-2px;padding:0px;">');
			},
			success: function(result)
			{
				jQuery('html, body').animate({scrollTop:jQuery('header .cartitems').position().top}, 'slow');

				this_link.find('img').remove();
				
				var response = JSON.parse(result);
				
				//jQuery('aside#minicart').addClass('active');
				jQuery('aside#minicart .innerbox').html(response.html);
				//setTimeout(function(){ jQuery('aside#minicart').removeClass('active'); }, 5000);

				jQuery('header .cartitems .itemcount span.itemno').text(response.current_cart_item);
				//jQuery('aside#cart .total span.price').text(response.current_cart_total);
				
				
				if(jQuery(".wishlistpage").length > 0)
				{
					jQuery.ajax({
						type: 'POST',
						data: {"product_id" : product_id},
						url: base_url+'ajax/remove_wish_list',
						success: function(result)
						{
							if(result=='empty_wishlist')
							{
								window.location.reload();
							}
							else
							{
								this_link.parent().parent().remove();
							}
						}
					});
				}
			}
		});
		
		return false;
	});
	jQuery('body').on('click', '.remove_from_cart', function()
	{
		jQuery.cookie("active_mini_cart", 1, {expires:1});
		
		var this_link = jQuery(this);
		var rowid=jQuery(this).attr('data-rowid');
		
		var ajax_url = base_url+'ajax/remove_from_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {"rowid" : rowid},
			url: ajax_url,
			success: function(result)
			{
				var response = JSON.parse(result);

				jQuery('aside#minicart').addClass('active');
				jQuery('aside#minicart .innerbox').html(response.html);
				
				jQuery('header .cartitems .itemcount span.itemno').text(response.current_cart_item);
				//jQuery('aside#cart .total span.price').text(response.current_cart_total);
			}
		});
		
		return false;
	});
	/*# cart update #*/
	jQuery('body').on('click', '.quantity-action>div', function()
	{
		jQuery.cookie("active_mini_cart", 1, {expires:1});
		
		var this_link = jQuery(this);
		var action_type=jQuery(this).attr('data-action_type');
		var rowid=jQuery(this).parent().attr('data-rowid');
		
		var ajax_url = base_url+'ajax/update_to_cart';
		
		jQuery.ajax({
			type: 'POST',
			data: {
				"rowid" : rowid,
				"action_type" : action_type
			},
			url: ajax_url,
			success: function(result)
			{
				var response = JSON.parse(result);

				jQuery('aside#minicart').addClass('active');
				jQuery('aside#minicart .innerbox').html(response.html);
				
				jQuery('header .cartitems .itemcount span.itemno').text(response.current_cart_item);
				//jQuery('aside#cart .total span.price').text(response.current_cart_total);
			}
		});
		
		return false;
	});
	
	
	
	/*### mini cart ###*/
	var active_mini_cart = jQuery.cookie("active_mini_cart");
	if(active_mini_cart==1)
	{
		jQuery('aside#minicart').addClass('active');
	}
	jQuery('header .cartitems a').on('click', function()
	{
		jQuery('aside#minicart').addClass('active');
		return false;
	});
	jQuery('.closeCartBox').on('click', function()
	{
		jQuery.cookie("active_mini_cart", '');
		
		jQuery('aside#minicart').removeClass('active');
		return false;
	});
	
	
	/*### checkout ###*/
	jQuery('input[type=radio][name=shipping_charge]').change(function()
	{
		var shipping_charge = this.value;

		var formatted_shipping_charge = jQuery.number(shipping_charge, 2);

		var order_sub_total = jQuery('.cart-info table input[name=order_sub_total]').val();

		var order_total = parseFloat(order_sub_total) + parseFloat(shipping_charge);
		order_total = jQuery.number(order_total, 2);

		jQuery('.cart-info table .shipping-charge .shipping-charge-in-text').text(formatted_shipping_charge);

		jQuery('.cart-info table .totalamout .total-amout-in-text').text(order_total);

		jQuery('.cart-info table input[name=order_total]').val(order_total);
	});
	
	
	/*### review ###*/
	jQuery('.clkaddreview').on('click', function()
	{
		jQuery('.singleproduct .nav-tabs li.review a').trigger('click');
		
		jQuery('html, body').animate({
			scrollTop: jQuery('#review').offset().top - 100
		}, 1000);
	});
	
	jQuery('#reviewbtn').on('click', function()
	{
		var reviewbtn = jQuery(this);
		
		jQuery('.reviewform').find('.field').removeClass('validation-error');
		
		var rating = jQuery('.reviewform input[name=rating]:checked').val();
		var name = jQuery('.reviewform input[name=name]').val();
		var email = jQuery('.reviewform input[name=email]').val();
		var comment = jQuery('.reviewform textarea[name=comment]').val();
		var product_id = jQuery('.reviewform input[name=product_id]').val();
		
		/*alert('rating: '+rating);
		alert('name: '+name);
		alert('email: '+email);
		alert('comment: '+comment);
		alert('product_id: '+product_id);*/
		
		if(typeof(rating)=='undefined')
		{
			jQuery('.reviewform .field-rating').addClass('validation-error');
			return false;
		}
		if(name=='')
		{
			jQuery('.reviewform .field-name').focus();
			jQuery('.reviewform .field-name').addClass('validation-error');
			return false;
		}
		if(email=='')
		{
			jQuery('.reviewform .field-email').focus();
			jQuery('.reviewform .field-email').addClass('validation-error');
			return false;
		}
		if(comment=='')
		{
			jQuery('.reviewform .field-comment').focus();
			jQuery('.reviewform .field-comment').addClass('validation-error');
			return false;
		}
		
		var ajax_url = base_url+'ajax/add_to_review';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"rating" : rating,
				"name" : name,
				"email" : email,
				"comment" : comment,
				"product_id" : product_id
			},
			url:ajax_url,
			beforeSend:function()
			{
				reviewbtn.append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				var cur_loc_href = window.location.href;
				cur_loc_href = cur_loc_href.split('?review=');
				cur_loc_href = cur_loc_href[0];
				window.location.replace(cur_loc_href+'?review='+result);
			}
		});
	});
	
	if(window.location.href.indexOf("?review=") > -1)
	{
		jQuery('.singleproduct .nav-tabs li.review a').trigger('click');
		
		jQuery('html, body').animate({
			scrollTop: jQuery('#review').offset().top - 100
		}, 1000);
    }
	
	
	/*### location direction ###*/
	jQuery('.location_direction').on('click', function()
	{
		jQuery('body').append('<div id="cboxPopup"></div>');
		jQuery('#location_direction_modal_box').show();
		popup_dv_position_set('location_direction_modal_box');
		jQuery('#location_direction_modal_box').prepend('<button type="button" id="cboxClose">X</button>');
		
		var iframe_title = jQuery(this).parent().find('.heading3').text();
		var iframe_data = jQuery(this).attr('data-iframe');
		
		jQuery('#location_direction_modal_box .popup-title').text(iframe_title);
		jQuery('#location_direction_modal_box iframe').attr('src', iframe_data);
		return false;
	});
	
	
	/*### product quick view ###*/
	jQuery('body').on('click', '.prod_quick_view', function()
	{
		var this_link = jQuery(this);
		var product_id=jQuery(this).attr('data-product_id');
		
		jQuery('body').append('<div id="cboxPopup"></div>');
		jQuery('#quickview').show();
		popup_dv_position_set('quickview');
		jQuery('#quickview').prepend('<button type="button" id="cboxClose">X</button>');
		
		var iframe_title = jQuery(this).parent().find('.heading3').text();
		var iframe_data = base_url+'product/quick_view/'+product_id;
		jQuery('#quickview iframe').attr('src', iframe_data);
		return false;
	});	
	
	
	/*### catproducts ###*/
	jQuery('.catproducts .title>a').on('click', function()
	{
		if(jQuery(this).find('i').hasClass('fa-bars'))
		{
			if(jQuery(this).parent().hasClass('active'))
			{
				jQuery(this).parent().removeClass('active');
				jQuery(this).parent().find('ul.subcats').slideUp();
			}
			else
			{
				jQuery(this).parent().addClass('active');
				jQuery(this).parent().find('ul.subcats').slideDown();
			}
			
			return false;
		}
	});
	
	
	/*### contact ###*/
	jQuery('.contactpage #emailus form').submit(function()
	{
		jQuery('#emailus').find('.form-control').removeClass('validation-error');
		
		var name = jQuery('#emailus input[name=name]').val();
		var phone = jQuery('#emailus input[name=phone]').val();
		var subject = jQuery('#emailus input[name=subject]').val();
		var message = jQuery('#emailus textarea[name=message]').val();
		
		if(name=='')
		{
			jQuery('#emailus .field-name').focus();
			jQuery('#emailus .field-name').addClass('validation-error');
			return false;
		}
		if(phone=='')
		{
			jQuery('#emailus .field-phone').focus();
			jQuery('#emailus .field-phone').addClass('validation-error');
			return false;
		}
		if(subject=='')
		{
			jQuery('#emailus .field-subject').focus();
			jQuery('#emailus .field-subject').addClass('validation-error');
			return false;
		}
		if(message=='')
		{
			jQuery('#emailus .field-message').focus();
			jQuery('#emailus .field-message').addClass('validation-error');
			return false;
		}
		
		var ajax_url = base_url+'ajax/contact_inquiry_action';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"name" : name,
				"phone" : phone,
				"subject" : subject,
				"message" : message
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('#emailus input[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				if(result!='')
				{
					jQuery('#emailus input, #emailus textarea').val('');
					jQuery('#emailus form').append('<div class="alert alert-success" role="alert" id="success_message">Success <i class="glyphicon glyphicon-thumbs-up"></i> Thanks for contacting us, we will get back to you shortly.</div>');
				}
				else
				{
					jQuery('#emailus form').append('<div class="alert alert-success" role="alert" id="failed_message">Sorry you have failed to send your inquiry!</div>');
				}
			}
		});
		
		return false;
	});
	
	
	/*### feedback ###*/
	jQuery('#feedback').on('click', function()
	{
		jQuery('body').append('<div id="cboxPopup"></div>');
		jQuery('#feedback_modal_box').show();
		popup_dv_position_set('feedback_modal_box');
		jQuery('#feedback_modal_box').prepend('<button type="button" id="cboxClose">X</button>');
		return false;
	});
	jQuery('#feedback_modal_box button[type=submit]').on('click', function()
	{
		jQuery('#feedback_modal_box').find('.field').removeClass('validation-error');
		
		var content_rating = jQuery('#feedback_modal_box input[name=content_rating]:checked').val();
		var design_rating = jQuery('#feedback_modal_box input[name=design_rating]:checked').val();
		var easy_use_rating = jQuery('#feedback_modal_box input[name=easy_use_rating]:checked').val();
		var overall_rating = jQuery('#feedback_modal_box input[name=overall_rating]:checked').val();
		var page = jQuery('#feedback_modal_box select[name=page]').val();
		var review = jQuery('#feedback_modal_box textarea[name=review]').val();
		var email_or_phone = jQuery('#feedback_modal_box input[name=email_or_phone]').val();
		var purpose_of_visit = jQuery('#feedback_modal_box select[name=purpose_of_visit]').val();
		var where_of_visit = jQuery('#feedback_modal_box select[name=where_of_visit]').val();
		var how_of_visit = jQuery('#feedback_modal_box select[name=how_of_visit]').val();
		
		if(typeof(content_rating)=='undefined')
		{
			jQuery('#feedback_modal_box .field-content-rating').addClass('validation-error');
			return false;
		}
		if(typeof(design_rating)=='undefined')
		{
			jQuery('#feedback_modal_box .field-design-rating').addClass('validation-error');
			return false;
		}
		if(typeof(easy_use_rating)=='undefined')
		{
			jQuery('#feedback_modal_box .field-easy-rating').addClass('validation-error');
			return false;
		}
		if(typeof(overall_rating)=='undefined')
		{
			jQuery('#feedback_modal_box .field-overall-rating').addClass('validation-error');
			return false;
		}
		if(page=='')
		{
			jQuery('#feedback_modal_box .field-page').focus();
			jQuery('#feedback_modal_box .field-page').addClass('validation-error');
			return false;
		}
		if(review=='')
		{
			jQuery('#feedback_modal_box .field-review').focus();
			jQuery('#feedback_modal_box .field-review').addClass('validation-error');
			return false;
		}
		if(email_or_phone=='')
		{
			jQuery('#feedback_modal_box .field-email').focus();
			jQuery('#feedback_modal_box .field-email').addClass('validation-error');
			return false;
		}
		if(purpose_of_visit=='')
		{
			jQuery('#feedback_modal_box .field-purpose').focus();
			jQuery('#feedback_modal_box .field-purpose').addClass('validation-error');
			return false;
		}
		
		var ajax_url = base_url+'ajax/feedback_action';
		
		var content_rating = jQuery('#feedback_modal_box input[name=content_rating]:checked').val();
		var design_rating = jQuery('#feedback_modal_box input[name=design_rating]:checked').val();
		var easy_use_rating = jQuery('#feedback_modal_box input[name=easy_use_rating]:checked').val();
		var overall_rating = jQuery('#feedback_modal_box input[name=overall_rating]:checked').val();
		var page = jQuery('#feedback_modal_box select[name=page]').val();
		var review = jQuery('#feedback_modal_box textarea[name=review]').val();
		var email_or_phone = jQuery('#feedback_modal_box input[name=email_or_phone]').val();
		var purpose_of_visit = jQuery('#feedback_modal_box select[name=purpose_of_visit]').val();
		var where_of_visit = jQuery('#feedback_modal_box select[name=where_of_visit]').val();
		var how_of_visit = jQuery('#feedback_modal_box select[name=how_of_visit]').val();
		
		jQuery.ajax({
			type:'POST',
			data:{
				"content_rating" : content_rating,
				"design_rating" : design_rating,
				"easy_use_rating" : easy_use_rating,
				"overall_rating" : overall_rating,
				"page" : page,
				"review" : review,
				"email_or_phone" : email_or_phone,
				"purpose_of_visit" : purpose_of_visit,
				"where_of_visit" : where_of_visit,
				"how_of_visit" : how_of_visit
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('#feedback_modal_box button[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				jQuery('#feedback_modal_box button[type=submit] img').remove();
				jQuery('#feedback_modal_box input').val('');
				jQuery('#feedback_modal_box textarea').val('');
				
				jQuery('#feedback_modal_box').hide();
				jQuery('#cboxPopup').remove();
				jQuery('#cboxClose').remove();
			}
		});
		
		return false;
	});
	
	
	/*### career ###*/
	jQuery('.careerpage form').submit(function()
	{
		jQuery('.careerpage').find('.form-control').removeClass('validation-error');
		jQuery('.careerpage').find('.errormsg').remove();
		
		var name = jQuery('.careerpage #name').val();
		var email = jQuery('.careerpage #email').val();
		var cvfile = jQuery('.careerpage #cvfile').val();
		
		if(name=='')
		{
			jQuery('.careerpage #name').focus();
			jQuery('.careerpage #name').addClass('validation-error');
			return false;
		}
		else if(email=='')
		{
			jQuery('.careerpage #email').focus();
			jQuery('.careerpage #email').addClass('validation-error');
			return false;
		}
		else if(cvfile=='')
		{
			jQuery('.careerpage #cvfile').focus();
			jQuery('.careerpage #cvfile').addClass('validation-error');
			return false;
		}
		else if(cvfile!='')
		{
			var file_extension = cvfile.split('.').pop().toLowerCase();
			if(jQuery.inArray(file_extension, ['doc','docx','pdf'])==-1)
			{
				jQuery('.careerpage #cvfile').focus();
				jQuery('.careerpage #cvfile').addClass('validation-error');
				jQuery('.careerpage #cvfile').parent().find('label').after('<p class="errormsg" style="margin:0px;font-size:12px;color:#d00;">Invalid file type! Please upload doc or pdf file.');
				return false;
			}
		}
		else
		{
			return true;
		}
	});
	
	
	/*### change customer password ###*/
	jQuery('form#changepw').submit(function()
	{
		jQuery('form#changepw').find('.form-control').removeClass('validation-error');
		jQuery('form#changepw').find('.errormsg').remove();
		
		var old_pass = jQuery('form#changepw #old_pass').val();
		var user_pass = jQuery('form#changepw #user_pass').val();
		var user_id = jQuery('form#changepw #user_id').val();
		
		if(old_pass=='')
		{
			jQuery('#changepw #old_pass').focus();
			jQuery('#changepw #old_pass').addClass('validation-error');
		}
		if(user_pass=='')
		{
			jQuery('#changepw #user_pass').focus();
			jQuery('#changepw #user_pass').addClass('validation-error');
		}
		if(user_id=='')
		{
			jQuery('#changepw #user_id').focus();
			jQuery('#changepw #user_id').addClass('validation-error');
		}
		
		var ajax_url = base_url+'ajax/changepw';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"user_id" : user_id,
				"old_pass" : old_pass,
				"user_pass" : user_pass
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('form#changepw button[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				jQuery('form#changepw button[type=submit] img').remove();
				
				if(result!='')
				{
					jQuery('form#changepw button[type=submit]').before('<div class="alert alert-success" role="alert" id="success_message">You have changed your password!</div>');
				}
				else
				{
					jQuery('form#changepw button[type=submit]').before('<div class="alert alert-success" role="alert" id="failed_message">Sorry you have failed to change your password!</div>');
				}
			}
		});
		
		return false;
	});
	
	
	/*### update customer information ###*/
	jQuery('form#useredit').submit(function()
	{
		jQuery('form#useredit').find('.form-control').removeClass('validation-error');
		jQuery('form#useredit').find('.errormsg').remove();
		
		var user_id = jQuery('form#useredit #user_id').val();
		var user_name = jQuery('form#useredit #user_name').val();
		var user_phone = jQuery('form#useredit #user_phone').val();
		var user_email = jQuery('form#useredit #user_email').val();
		var user_address = jQuery('form#useredit #user_address').val();
		var user_city = jQuery('form#useredit #user_city').val();
		var user_state = jQuery('form#useredit #user_state').val();
		
		if(user_name=='')
		{
			jQuery('#useredit #user_name').focus();
			jQuery('#useredit #user_name').addClass('validation-error');
		}
		if(user_phone=='')
		{
			jQuery('#useredit #user_phone').focus();
			jQuery('#useredit #user_phone').addClass('validation-error');
		}
		if(user_email=='')
		{
			jQuery('#useredit #user_email').focus();
			jQuery('#useredit #user_email').addClass('validation-error');
		}
		if(user_id=='')
		{
			jQuery('#useredit #user_id').focus();
			jQuery('#useredit #user_id').addClass('validation-error');
		}
		
		var ajax_url = base_url+'ajax/useredit';
		
		jQuery.ajax({
			type:'POST',
			data:{
				"user_id" : user_id,
				"user_name" : user_name,
				"user_phone" : user_phone,
				"user_email" : user_email,
				"user_address" : user_address,
				"user_city" : user_city,
				"user_state" : user_state
			},
			url:ajax_url,
			beforeSend:function()
			{
				jQuery('form#useredit button[type=submit]').append('<img src="'+base_url+'images/loading.gif" style="width:16px;height:16px;display:inline-block;margin:0px;margin-left:5px;padding:0px;">');
			},
			success:function(result)
			{
				jQuery('form#useredit button[type=submit] img').remove();
				
				if(result!='')
				{
					jQuery('form#useredit button[type=submit]').before('<div class="alert alert-success" role="alert" id="success_message">You have saved your changes!</div>');
				}
				else
				{
					jQuery('form#useredit button[type=submit]').before('<div class="alert alert-success" role="alert" id="failed_message">Sorry you have failed to update!</div>');
				}
			}
		});
		
		return false;
	});
	
	
	/*### auto suggestion search query ###*/
	jQuery('header #search #search_query').on('input', function()
	{
		var search_query = jQuery(this).val();
		var search_cat = jQuery('header #search #search_cat option:selected').val();
		
		if(search_query.length>1)
		{
			var ajax_url = base_url+'ajax/ajax_search_items';
			
			jQuery.ajax({
				type:'POST',
				data:{
					"search_query" : search_query,
					"search_cat" : search_cat
				},
				url:ajax_url,
				beforeSend:function()
				{
					jQuery('header #search .input-group ul.dropdown-menu').show();
					jQuery('header #search .input-group ul.dropdown-menu').html('<div class="searching" style="text-align:center;padding:10px;"><img src="'+base_url+'images/loading.gif"><div>Searching...</div></div>');
				},
				success:function(result)
				{
					var response = JSON.parse(result);
					
					if(response.status=='success')
					{
						jQuery('header #search .input-group ul.dropdown-menu').html(response.return_value);
					}
				}
			});
		}
		else
		{
			jQuery('header #search .input-group ul.dropdown-menu').html('');
		}
	});
	
	
	/*### become a dealer ###*/
	jQuery('#dealer').on('click', function()
	{
		jQuery('body').append('<div id="cboxPopup"></div>');
		jQuery('#become_a_dealer').show();
		popup_dv_position_set('become_a_dealer');
		jQuery('#become_a_dealer').prepend('<button type="button" id="cboxClose">X</button>');
		return false;
	});
	jQuery('#become_a_dealer form').submit(function()
	{
		jQuery('#become_a_dealer .innerbox').find('.response').remove();
		jQuery('#become_a_dealer input').removeClass('validation-error');
		
		var dealer_name = jQuery('#become_a_dealer input#dealer_name').val().trim();
		if(dealer_name=='')
		{
			jQuery('#become_a_dealer input#dealer_name').addClass('validation-error');
		}
		
		var dealer_email = jQuery('#become_a_dealer input#dealer_email').val().trim();
		if(dealer_email=='')
		{
			jQuery('#become_a_dealer input#dealer_email').addClass('validation-error');
		}
		
		var dealer_phone = jQuery('#become_a_dealer input#dealer_phone').val().trim();
		if(dealer_phone=='')
		{
			jQuery('#become_a_dealer input#dealer_phone').addClass('validation-error');
		}
		
		var dealer_address = jQuery('#become_a_dealer input#dealer_address').val().trim();
		if(dealer_address=='')
		{
			jQuery('#become_a_dealer input#dealer_address').addClass('validation-error');
		}
		
		var dealer_state = jQuery('#become_a_dealer select#dealer_state option:selected').val().trim();
		if(dealer_state=='')
		{
			jQuery('#become_a_dealer select#dealer_state').addClass('validation-error');
		}
		
		var dealer_comment = jQuery('#become_a_dealer #dealer_comment').val().trim();
		
		if(dealer_name=='' || dealer_email=='' || dealer_phone=='' || dealer_address=='' || dealer_state=='')
		{
			return false;
		}
		
		var ajax_url = base_url+'ajax/make_a_dealer';

		jQuery.ajax({
			type: 'POST',
			data: {
				"dealer_name" : dealer_name,
				"dealer_email" : dealer_email,
				"dealer_phone" : dealer_phone,
				"dealer_address" : dealer_address,
				"dealer_state" : dealer_state,
				"dealer_comment" : dealer_comment
			},
			url: ajax_url,
			success: function(result)
			{
				var response = JSON.parse(result);
				
				if(response.success==true)
				{
					jQuery('#become_a_dealer .innerbox').prepend('<p class="response success">Congratulations! You are listed as a dealer.</p>');
				}
				else
				{
					if(response.type=='duplicate')
					{
						jQuery('#become_a_dealer .innerbox').prepend('<p class="response failed">Duplicate entry! You already listed!</p>');
					}
					else
					{
						jQuery('#become_a_dealer .innerbox').prepend('<p class="response failed">Sorry you have failed! Try again!</p>');
					}
				}
			}
		});
		
		return false;
	});


	/*### facebook chat ###*/
	jQuery('.fbchatbtn, .fbchat-title').on('click', function()
	{
		jQuery('.fbchat').slideToggle('slow');
	});
});