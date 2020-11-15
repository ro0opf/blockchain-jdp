package com.ro0opf.blockchain.util

import android.widget.ImageView
import androidx.databinding.BindingAdapter
import com.ro0opf.blockchain.R

@BindingAdapter("setImageCircleSrc")
fun <T> setImageCircleSrc(view: ImageView, imageSrc: T){
    GlideApp
        .with(view.context)
        .load(imageSrc)
        .error(R.drawable.ic_error)
        .circleCrop()
        .into(view)
}


@BindingAdapter("setImageCenterSrc")
fun <T> setImageCenterSrc(view: ImageView, imageSrc: T){
    GlideApp
        .with(view.context)
        .load(imageSrc)
        .error(R.drawable.ic_error)
        .centerCrop()
        .into(view)
}