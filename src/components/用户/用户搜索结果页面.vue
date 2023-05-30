<template>

</template>



<script>
export default{

    data(){
        return{
            user_id:'',
            input:'',
            search_result:[],
        }

    },
    mounted(){
        this.user_id = this.$route.query.user_id
        this.search_result = this.$route.query.search_result
        
    },  
    methods:
    {


        
    }

}



</script>